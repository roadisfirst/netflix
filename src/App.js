import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login';
import Auth from './pages/Auth/Auth';
import Logout from './pages/Auth/Logout/Logout';
import { connect } from 'react-redux';

const App = props => {

  let routes = (
      <BrowserRouter>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/auth'} component={Auth} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
  );

  if (props.isAuthenticated) {
    routes = (
      <BrowserRouter>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/login'} component={Login} />
          <Route path={'/auth'} component={Auth} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <div className="container">
      {routes}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(App);