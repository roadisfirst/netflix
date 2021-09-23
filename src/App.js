import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Login } from './pages/Login';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
