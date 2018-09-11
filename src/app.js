import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/app.css';
import Home from './components/pages/home.js';
import Recipe from './components/pages/recipe.js';
import RecipeEdit from './components/pages/recipe-edit.js';
import OwnRecipes from './components/pages/own-recipes.js';
import Favorites from './components/pages/favorites.js';
import ErrorPage from './components/pages/error-page.js';
import Login from './components/pages/login.js';
import Signup from './components/pages/signup.js';
import Logout from './components/pages/logout.js';
import Profile from './components/pages/profile.js';
import Menus from './components/pages/menus.js';
import Menu from './components/pages/menu.js';
import Search from './components/pages/search.js';
import Dashboard from './components/pages/dashboard.js';
import HandleErrors from './components/helpers/error-handler.js';
import config from './config.js';

class App extends Component {
  checkauth() {
    if(!localStorage.getItem('token'))
      return;
    fetch(`${config.REACT_APP_APIURL}/checkauth`,
      { method: 'get',
        headers: {
          'Authorization': `Beablabla ${localStorage.getItem('token')}`
        }
      })
      .then(HandleErrors)
      .then(res => res.json())
      .then((result) => {
        sessionStorage.setItem('user', result.user.id);
        if(result.user.avatar_url)
          sessionStorage.setItem('user_avatar', result.user.avatar_url);
        if(result.user.roles && result.user.roles.includes('admin')){
          sessionStorage.setItem('admin', true);
        } else {
          sessionStorage.removeItem('admin');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('user_avatar');
        sessionStorage.removeItem('admin');
      });
  }

  render() {
    setInterval(this.checkauth, 300000);
    return (
      <Router>
        <div className='app'>
          <Switch>
            <Dashboard>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/menus" component={Menus} />
              <Route exact path="/own-recipes" component={OwnRecipes} />
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/recipes/:id" component={Recipe} />
              <Route exact path="/recipes/:id/edit" component={RecipeEdit} />
              <Route exact path="/create-recipe" component={RecipeEdit} />
              <Route exact path="/menu/:id" component={Menu} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/error/:code/:message" component={ErrorPage} />
            </Dashboard>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
