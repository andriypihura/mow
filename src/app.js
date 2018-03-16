import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/app.css';
import Home from './components/pages/home.js';
import Recipe from './components/pages/recipe.js';
import ErrorPage from './components/pages/error-page.js';
import Login from './components/pages/login.js';
import Logout from './components/pages/logout.js';
import Profile from './components/pages/profile.js';
import Menus from './components/pages/menus.js';
import Menu from './components/pages/menu.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='app'>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/menus" component={Menus} />
            <Route exact path="/recipes/:id" component={Recipe} />
            <Route exact path="/menu/:id" component={Menu} />
            <Route exact path="/error/:code/:message" component={ErrorPage} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
