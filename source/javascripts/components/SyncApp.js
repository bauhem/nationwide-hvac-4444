import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  validateAuthentication() {
    const user = netlifyIdentity.currentUser();

    if (user !== null) {
      this.isAuthenticated = true;
      this.user = user;
    }
  },
  authenticate(callback) {
    this.isAuthenticated = true;
    netlifyIdentity.open();
    netlifyIdentity.on('login', user => {
      this.user = user;
      callback(user);
    });
  },
  signout(callback) {
    this.isAuthenticated = false;
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      this.user = null;
      callback();
    });
  },
  generateHeaders() {
    const headers = {"Content-Type": "application/json"};
    if (netlifyIdentity.currentUser()) {
      return netlifyIdentity.currentUser().jwt().then((token) => {
        return {...headers, Authorization: `Bearer ${token}`};
      })
    }
    return Promise.resolve(headers);
  }
};


class SyncApp extends React.Component {
  constructor(props) {
    super(props);

    netlifyAuth.validateAuthentication();

    this.state = {
      loggedIn: netlifyAuth.isAuthenticated,
      msg: '',
      loading: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.sync = this.sync.bind(this);
  }
  ;

  handleLogin(e) {
    this.setState({loggedIn: true});
  }

  handleLogout(e) {
    this.setState({loggedIn: false})
  }

  sync(method) {
    console.log(`Syncing ${method}`)
    this.setState({loading: true});

    netlifyAuth.generateHeaders().then((headers) => {
      fetch('https://nationwide-hvac.netlify.com/.netlify/functions/airtable-lambda?sync=' + method, {
        method: "GET",
        headers
      })
        .then(response => response.json())
        .then(json => this.setState({loading: false, msg: json.msg}))
        .catch(err => this.setState({loading: false, msg: err.toString()}))
    });
  }

  render() {
    return (
      this.state.loggedIn ? (<SyncMenu onLogout={this.handleLogout}
                                       sync={this.sync} {...this.state}/>) : (
        <Login onLogin={this.handleLogin}/>)
    );

  }
}

function SyncMenu(props) {
  return (
    <>
      <div>
        Welcome {netlifyAuth.user.user_metadata.full_name}!
        <button
          onClick={() => {
            netlifyAuth.signout(() => props.onLogout());
          }}>
          Logout
        </button>
      </div>
      <div>{props.msg}</div>
      <div>
        <button onClick={() => props.sync('products')} disabled={props.loading}>
          {props.loading ? 'Synchronizing...' : 'Sync Products'}
        </button>
        <button onClick={() => props.sync('accessories')}
                disabled={props.loading}>
          {props.loading ? 'Synchronizing...' : 'Sync Accessories'}
        </button>
        <button onClick={() => props.sync('vendors')} disabled={props.loading}>
          {props.loading ? 'Synchronizing...' : 'Sync Vendors'}
        </button>
        <button onClick={() => props.sync('zones')} disabled={props.loading}>
          {props.loading ? 'Synchronizing...' : 'Sync Zones'}
        </button>
        <button onClick={() => props.sync('')} disabled={props.loading}>
          {props.loading ? 'Synchronizing...' : 'Sync All'}
        </button>
      </div>
    </>
  );
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    netlifyAuth.authenticate(() => {
      this.props.onLogin();
    });
  };

  render() {
    return (
      <div>
        <p>You must log in to view this page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default SyncApp;