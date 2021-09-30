import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import Shows from './pages/Shows/Shows';
import SingleShow from './pages/Shows/SingleShow/SingleShow';
import Profile from './pages/Profile/Profile';
import Auth from './pages/Auth/Auth';
import Logout from './pages/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { Navbar } from './components/Navbar/Navbar';
import * as actions from './store/actions/index';

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, [props]);

  let routes = (
      <BrowserRouter>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/auth'} component={Auth} />
          <Route path={'/user/:id'} component={Profile} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
  );

  if (props.isAuthenticated) {
    routes = (
      <BrowserRouter>
      <Navbar userId={props?.userId}/>
        <Switch>
          {/* <Route path={'/'} exact component={Home} /> */}
          <Route path={'/auth'} component={Auth} />
          <Route path={'/logout'} component={Logout} />
          <Route path={'/shows'} exact component={Shows} />
          <Route path={'/shows&page=:number'} exact component={Shows} />
          <Route path={'/shows/:id'} exact component={SingleShow} />
          <Route path={'/user/:id'} exact component={Profile} />
          <Redirect to="/shows" />
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
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);