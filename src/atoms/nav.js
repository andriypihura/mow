import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './../css/nav.css';

class Nav extends Component{
  render(){
    if(localStorage.getItem('token')){
      return (
        <div className='nav'>
          <Link to="/" className='nav--link -logo'>MenuOnWeb</Link>
          <Link to="/recipe-overview" className='link -secondary'>Recipe overview</Link>
          <Link to="/create-recipe" className='link -secondary'>Add recipe</Link>
          <Link to="/menus" className='link -secondary'>Menus</Link>
          <Link to="/profile" className='link -secondary'>Profile</Link>
          <Link to="/search" className='link -secondary'>Search</Link>
          <Link to="/logout" className='link -secondary'>Log out</Link>
        </div>
      );
    } else {
      return (
        <div className='nav'>
          <Link to="/" className='nav--link -logo'>MenuOnWeb</Link>
          <Link to="/search" className='link -secondary'>Search</Link>
          <Link to="/login" className='link -secondary'>Log in</Link>
          <Link to="/signup" className='link -secondary'>Sign up</Link>
        </div>
      );
    }
  }
}

Nav.propTypes = {
  changePage: PropTypes.func
};

export default Nav;
