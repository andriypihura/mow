import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './css/App.css';
import Home from './components/pages/Home.js';
import Recipe from './components/pages/Recipe.js';
import Profile from './components/pages/Profile.js';
import Nav from './components/atoms/Nav.js';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/recipes-:type" component={Recipe} />
                <Route path="/profile" component={Profile} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
