import React from 'react';
import { Route, Switch} from 'react-router-dom';
import { Login } from './pages/Login';

function App() {
  return (
    <div className="container">
        <Switch>
          <Route component={Login} />
        </Switch>
    </div>
  );
}

export default App;
