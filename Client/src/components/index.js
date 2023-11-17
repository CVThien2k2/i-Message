import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Login/Login';
import ChatRoom from './ChatRoom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/chatroom" component={ChatRoom} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
