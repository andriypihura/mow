import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/app.css';
import Home from './components/pages/home.js';
import Recipe from './components/pages/recipe.js';
import RecipeEdit from './components/pages/recipe-edit.js';
import RecipeOverview from './components/pages/recipe-overview.js';
import ErrorPage from './components/pages/error-page.js';
import Login from './components/pages/login.js';
import Signup from './components/pages/signup.js';
import Logout from './components/pages/logout.js';
import Profile from './components/pages/profile.js';
import Menus from './components/pages/menus.js';
import Menu from './components/pages/menu.js';
import Search from './components/pages/search.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='app'>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/menus" component={Menus} />
            <Route exact path="/recipe-overview" component={RecipeOverview} />
            <Route exact path="/recipes/:id" component={Recipe} />
            <Route exact path="/recipes/:id/edit" component={RecipeEdit} />
            <Route exact path="/create-recipe" component={RecipeEdit} />
            <Route exact path="/menu/:id" component={Menu} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/error/:code/:message" component={ErrorPage} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
