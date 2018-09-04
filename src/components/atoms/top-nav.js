import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../css/top-nav.css';

class TopNav extends Component{
  render(){
    if(localStorage.getItem('token')){
      return (
        <div className='top-nav'>
          <Link to="/search" className='link -secondary'>Search</Link>
          <Link to="/profile" className='link -secondary'>Profile</Link>
          <Link to="/logout" className='link -secondary'>Log out</Link>
        </div>
      );
    } else {
      return (
        <div className='top-nav'>
          <Link to="/search" className='link -secondary'>Search</Link>
          <Link to="/login" className='link -secondary'>Log in</Link>
          <Link to="/signup" className='link -secondary'>Sign up</Link>
        </div>
      );
    }
  }
}
export default TopNav;
