import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../css/nav.css';

class Nav extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId
    }
  }
  render(){
    if(this.state.userId){
      return (
        <div className='nav'>
          <Link to="/" className='nav--link -logo'>MenuOnWeb</Link>
          <Link to={`/profiles/${this.props.userId}`} className='link -secondary'>Profile</Link>
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
