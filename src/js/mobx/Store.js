import { observable, action } from 'mobx'
const server = 'http://localhost:3003/'
import renderChart from '../renderChart'

class Store {
  context = this;
  canvas = null;

  @observable user = null;
  @observable userId = null;
  @observable isAuthenticated = false;
  @observable dayRange = 30;
  @observable loginStatus = null;
  @observable allData = [];
  @observable dataLoaded = false;

  @action updateUser(user) {
    this.user = user;
  }

  @action addReading(bp) {
    console.log('adding ', bp, 'to chart')
    this.allData.push(bp);
  }

  @action startSession(res) {
    this.user = res.user;
    this.userId = res.user._id
    this.isAuthenticated = true;
    this.allData = res.bps;
    setTimeout(() => {
      renderChart(store.canvas, this.allData.slice(-this.dayRange))      
    }, 1000)
  }

  @action register(user) {
    fetch(server + 'register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then( (res) => {
      if (res.status !== 200) {
        throw res.json();
      }
      console.log('status', res.status);
      return res.json()
    })
    .then( (data) => {
      console.log('added user!', data)
      this.startSession(data)
      return data;
    })
    .catch( (e) => {
      e.then( (err) => {
        console.error('didnt find user', err)
        this.isAuthenticated = false;
        this.loginStatus = err.message;
      })
    })
  }

  @action login(user){
    fetch(server + 'login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
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

      // this.getBP(user._id);
    })
    .catch(e => {
      console.log('error before login promise:', e)
        e.then( (err) => {
          this.isAuthenticated = false;
          this.loginStatus = err.message;
        })
    })
  }

  @action auth0() {
    fetch(server + 'auth0', {
      method: 'get'
    })
    .then( (res) => {
      console.log('auth0', res)
    })
    .catch( (err) => {
      console.log('auth0 failed', err)
    })
  }

  @action addBP(bp) {
    console.log('in BP')
    fetch(server + 'BP', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'test',
        bp: bp
      })
    })
    .then( (res) => {
      console.log('responded')
      return res.json();
    })
    .then( (bp) => {
      console.log('added', bp)
    })
    .catch( e => console.log('could not add bp'))
  }

  @action getBP(userId) {
    fetch(server + 'BP', {
      method: 'get'
    })
    .then( (data) => data.json())
    .then( (bps) => {
      console.log('got BP response')
    })
  }


  // allData = Array.from( new Array(600), (x, index) => {
  //   var sys = Math.floor(Math.random() * 10) + 120;
  //   var dia = Math.floor(Math.random() * 10) + 80;
  //   return [sys, dia, index]
  // })

  @observable currentIndex = this.allData.length;
}

const store = new Store();

export default store
