import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/app.css';
import Home from './components/pages/home.js';
import Recipe from './components/pages/recipe.js';
import NotFound from './components/pages/not-found.js';
import Nav from './components/atoms/nav.js';
import Footer from './components/atoms/footer.js';
import Login from './components/pages/login.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='app'>
          <div className='app--inner'>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/recipes/:id" component={Recipe} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
