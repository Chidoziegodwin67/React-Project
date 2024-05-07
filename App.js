import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Repositories from './Repositories';
import NotFound from './NotFund';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Repositories} />
        
      </Switch>
    </Router>
  );
}
export default App;