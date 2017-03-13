import { observable, action, toJS } from 'mobx'
const server = 'http://localhost:3003/'
import renderChart from '../renderChart'
import moment from 'moment'

// client side auth0
import Auth0Lock from 'auth0-lock'
import secrets from '../../secrets.json'


class Store {
  // constants
  context = this;
  canvas = null;
  lock = null;
  // observables
  @observable user = null;
  @observable accessToken = null;
  @observable userId = null;
  @observable loggedIn = false;

  @observable isAuthenticated = false;
  @observable dayRange = 30;
  @observable loginStatus = null;
  @observable allData = [];
  // @observable dataLoaded = false;

  @observable allDataObject = {};

  @action resetAll() {
    this.user = null;
    this.accessToken = null;
    this.userId = null;
    this.loggedIn = false;
    this.loginStatus = null;
    this.allData = [];
  }
  // auth0
  @action objectifyData() {
    this.allData.forEach((data) => {
      this.setObjectBP(data.date, data);
    })
  }

  // sets data for one date
  @action setObjectBP(date, data) {
    var thisDate = moment(date).format('YYYY-MM-DD')
    this.allDataObject[thisDate] = data;
  }

  @action initializeAuth0(dontShow) {
    var context = this;
    this.lock = new Auth0Lock(secrets.CLIENT_ID, secrets.DOMAIN);
    this.lock.on("authenticated", function(authResult) {
      context.lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          return;
        }

        // Save token and profile locally
        console.log(authResult)
        localStorage.setItem("accessToken", authResult.accessToken);
        localStorage.setItem("profile", JSON.stringify(profile));
        localStorage.setItem("idToken", authResult.idToken);

        context.loggedIn = true;
        
        // Update DOM
        context.user = {
          email: profile.email,
          username: profile.name,
          clientID: profile.clientID
        }
        context.accessToken = authResult.accessToken;
        context.idToken = authResult.idToken;

        console.log('added user: ', profile.email, profile.name)
      });
    });

    if(!dontShow) {
      this.lock.show()
    };
  }

  @action getAccessToken() {
    var accessToken = localStorage.getItem('accessToken');
    var profile = JSON.parse(localStorage.getItem('profile'));
    var idToken = localStorage.getItem('idToken');

    if (accessToken && profile) {
      this.accessToken = accessToken;
      this.user = {
        email: profile.email,
        username: profile.name,
        clientID: profile.clientID
      }

      return true;
    }

    return false;
  }

  @action getProfile() {
    if (this.token) {
      this.lock.getUserInfo(this.accessToken, function (err, profile) {
        if (err) {
          console.log("Error loading the Profile", err);
          return;
        }
        console.log('got profile:' , profile)
      }.bind(this));
    } else {
      console.log(' no token')
    }
  }

  // users
  @action updateUser(user) {
    this.user = user;
  }

  @action startSession(res) {
    console.log('in startsession', res)

    // set the user and bps 
    this.user = res.user;
    this.loggedIn = true;
    this.allData = res.bps;
    this.objectifyData();
    console.log('got user', this.user, 'got data', this.allData)

    // give time for component to mount before rendering
    setTimeout(() => {
      renderChart(store.canvas, this.allData.slice(-this.dayRange), 30, this.allDataObject)      
    }, 1000)
  }

  @action initialRegister() {
    console.log('in intitial register')
    if (localStorage.idToken && localStorage.profile) {
      const profile = JSON.parse(localStorage.profile);
      console.log(profile.clientID)
      fetch(server + 'register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.idToken
        },
        body: JSON.stringify({
          username: profile.name,
          email: profile.email,
          clientID: profile.clientID
        })
      })
      .then( (res) => {
        if (res.status !== 200) {
          throw res.json();
        }
        console.log('status', res.status);
        return res.json()
      })
      .then( (data) => {
        this.loggedIn = true;
        console.log('added user!', data)
        this.startSession(data)
        return data;
      })
      .catch( (e) => {
        e.then( (err) => {
          console.error('didnt find user', err)
          this.isAuthenticated = false;
          this.loginStatus = err.message;
          this.initializeAuth0();
        })
      })
    }
  }

  @action register() {
    // this.lock.show();
    if (localStorage.idToken && localStorage.profile) {
      const profile = JSON.parse(localStorage.profile);
      console.log(profile.clientID)
      fetch(server + 'register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.idToken
        },
        body: JSON.stringify({
          username: profile.name,
          email: profile.email,
          clientID: profile.clientID
        })
      })
      .then( (res) => {
        if (res.status !== 200) {
          throw res.json();
        }
        console.log('status', res.status);
        return res.json()
      })
      .then( (data) => {
        this.loggedIn = true;
        console.log('added user!', data)
        this.startSession(data)
        return data;
      })
      .catch( (e) => {
        e.then( (err) => {
          console.error('didnt find user', err)
          this.isAuthenticated = false;
          this.loginStatus = err.message;
          this.initializeAuth0();
        })
      })
    } else {
      this.initializeAuth0();
      this.loginStatus = 'Login failed, please try again.'
    }
  }

  @action login() {
    if (localStorage.idToken && localStorage.profile) {
      const profile = JSON.parse(localStorage.profile);
      console.log('email': localStorage.profile.email)
      fetch(server + 'login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.idToken
        },
        body: JSON.stringify({
          email: profile.email,
          clientID: profile.clientID
        })
      })
      .then( (res) => {
        if (res.status !== 200) {
          throw res.json();
        }

        console.log('status', res.status);
        return res.json()
      })
      .then((res)  => {
        this.startSession(res)
      })
      .catch(e => {
        console.log('error before login promise:', e)
          e.then( (err) => {
            this.isAuthenticated = false;
            this.loginStatus = err.message;
          })
          this.initializeAuth0();
      })
    } else {
      console.log('login failed')
      this.initializeAuth0();
    }
  }

  @action addBP(bp) {
    // update the DOM
    this.setObjectBP(bp.date, bp)
    renderChart(store.canvas, this.allData.slice(-this.dayRange), this.dayRange, this.allDataObject)
    
    // send to DB
    fetch(server + 'BP', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.idToken
      },
      body: JSON.stringify({
        email: this.user.email,
        bp: bp
      })
    })
    .then( (res) => {
      console.log('responded')
      return res.json();
    })
    .then( (res) => {
      console.log('added', bp, res)
    })
    .catch( e => console.log('could not add bp'))
  }
}

const store = new Store();

export default store
