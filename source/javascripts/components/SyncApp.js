import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import urljoin from 'url-join';

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
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (netlifyIdentity.currentUser()) {
      return netlifyIdentity.currentUser().jwt().then((token) => {
        headers.append('Authorization', `Bearer ${token}`);
        return headers;
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
    this.setState({loading: true, msg: ''});

    netlifyAuth.generateHeaders().then((headers) => {
      // TODO - function name should come from a prop or config as well
      fetch(urljoin(this.props.lambdaUrl, 'airtable-lambda', '?sync=' + method), {
        method: "GET",
        headers: headers
      })
        .then(response => response.json())
        .then(json => this.setState({ loading: false, msg: json.msg }))
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
        (Not you? <button
          onClick={() => {
            netlifyAuth.signout(() => props.onLogout());
          }} className={"button dark-color w-button"}>
          Logout
        </button>)
      </div>
      <div>{props.msg}</div>
      <div>
        <p>Select what you want to synchronize</p>
        
        <SyncBtn label={"Products"} syncMethod={"products"} {...props}/>
        <SyncBtn label={"Accessories"} syncMethod={"accessories"} {...props}/>
        <SyncBtn label={"Vendors"} syncMethod={"vendors"} {...props}/>
        <SyncBtn label={"Zones"} syncMethod={"zones"} {...props}/>
        <SyncBtn label={"All"} syncMethod={"syncAll"} {...props}/>
      </div>
    </>
  );
}

function SyncBtn(props) {
  return (
    <button className="button"
            onClick={() => props.sync(props.syncMethod)}
            disabled={props.loading}>
      {props.label}
    </button>
  )
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
        <button className={"button"} onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default SyncApp;