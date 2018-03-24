import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../css/nav.css';

class Nav extends Component{
  render(){
    if(localStorage.getItem('token')){
      return (
        <div className='nav'>
          <Link to="/" className='nav--link -logo'>MenuOnWeb</Link>
          <Link to="/menus" className='link -secondary'>Menus</Link>
          <Link to="/profile" className='link -secondary'>Profile</Link>
          <Link to="/logout" className='link -secondary'>Log out</Link>
        </div>
      );
    } else {
      return (
        <div className='nav'>
          <Link to="/" className='nav--link -logo'>MenuOnWeb</Link>
          <Link to="/login" className='link -secondary'>Log in</Link>
        </div>
      );
    }
  }
}
export default Nav;
