import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../css/Nav.css';

class Nav extends Component{
  render(){
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/recipes-own">My recipes</Link>
        <Link to="/recipes-favorites">Favorites</Link>
        <Link to="/profile">Profile</Link>
      </div>
    );
  }
}
export default Nav;
