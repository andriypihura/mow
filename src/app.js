import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/app.css';
import Home from './components/pages/home.js';
import Recipe from './components/pages/recipe.js';
import NotFound from './components/pages/not-found.js';
import Login from './components/pages/login.js';
import Logout from './components/pages/logout.js';
import Profile from './components/pages/profile.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='app'>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/profiles/:id" component={Profile} />
            <Route exact path="/recipes/:id" component={Recipe} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
