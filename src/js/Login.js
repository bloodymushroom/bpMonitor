import React, {Component} from 'react'
import classNames from './styles/login.css'

//mobx
import store from './mobx/Store';
import { observer } from 'mobx-react'

@observer
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: 'signIn'
    }

    this.toggleView = this.toggleView.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.showLock = this.showLock.bind(this);
  }

  showLock(e) {
    e.preventDefault();
    store.lock.show()
  }

  toggleView(e, view) {
    e.preventDefault();

    this.setState({
      currentView: view,
      error: null,
      username: null,
      password: null,
      email: null
    })
  }

  handleInput(e) {
    var name = e.target.name;
    var value = e.target.value;

    this.setState({
      [name]: value
    })
  }

  register(e) {
    e.preventDefault();
    store.register()
  }

  login(e) {
    e.preventDefault();
// 
    // store.register()
    store.login(this.state);
    // store.isAuthenticated = true;
  }

  componentWillMount(){
    store.initializeAuth0(true);
  }


  render() {
    return (
      <div className={classNames.loginContainer}>
        { this.state.currentView === 'register' &&
          <form className={classNames.loginForm}>
            <input onChange={this.handleInput} name='username' type="text" placeholder="name"/>
            <input onChange={this.handleInput} name='password' type="password" placeholder="password"/>
            <input onChange={this.handleInput} name='email' type="text" placeholder="email address"/>
            <button onClick={this.register}>register</button>
            <p className={classNames.message}>Already registered? 
              <a onClick={(e) => this.toggleView(e, 'signIn')} href="#">Sign In</a>
            </p>
          </form>
        }
        { this.state.currentView === 'signIn' &&
          <form className={classNames.loginForm}>
            <input onChange={this.handleInput} name='email' type="text" placeholder="email"/>
            <input onChange={this.handleInput} name='password' type="password" placeholder="password"/>
            <button onClick={this.login}>login</button>
            <p className={classNames.message}>Not registered? 
              <a onClick={(e) => this.toggleView(e, 'register')} href="#">Create an account</a>
            </p>
          </form>
        }
        <span className={classNames.message}>{store.loginStatus}</span>
      </div>
    )
  }
}

export default Login