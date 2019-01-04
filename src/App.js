import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/app.css';
import Home from './pages/home.js';
import Recipe from './pages/recipe.js';
import RecipeEdit from './pages/recipe-edit.js';
import RecipeOverview from './pages/recipe-overview.js';
import ErrorPage from './pages/error-page.js';
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import Logout from './pages/logout.js';
import Profile from './pages/profile.js';
import Menus from './pages/menus.js';
import Menu from './pages/menu.js';
import Search from './pages/search.js';

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
