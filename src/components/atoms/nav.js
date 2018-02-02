import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../css/nav.css';

class Nav extends Component{
  render(){
    return (
      <div className='nav'>
        <Link to="/" className='nav--link -logo'>MenuOnWeb</Link>
        <Link to="/login" className='link -secondary'>Log in</Link>
      </div>
    );
  }
}
export default Nav;
