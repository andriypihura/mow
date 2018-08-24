import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './../../css/nav.css';
import * as actions from './../../actions';

class Nav extends Component{
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
  }

  changePage(e) {
    this.props.changePage(
      e.target.href.replace('http://localhost:3000/', '')
    );
  }

  render(){
    if(localStorage.getItem('token')){
      return (
        <div className='nav'>
          <Link onClick={this.changePage} to="/" className='nav--link -logo'>MenuOnWeb</Link>
          <Link onClick={this.changePage} to="/recipe-overview" className='link -secondary'>Recipe overview</Link>
          <Link onClick={this.changePage} to="/create-recipe" className='link -secondary'>Add recipe</Link>
          <Link onClick={this.changePage} to="/menus" className='link -secondary'>Menus</Link>
          <Link onClick={this.changePage} to="/profile" className='link -secondary'>Profile</Link>
          <Link onClick={this.changePage} to="/search" className='link -secondary'>Search</Link>
          <Link onClick={this.changePage} to="/logout" className='link -secondary'>Log out</Link>
        </div>
      );
    } else {
      return (
        <div className='nav'>
          <Link onClick={this.changePage} to="/" className='nav--link -logo'>MenuOnWeb</Link>
          <Link onClick={this.changePage} to="/search" className='link -secondary'>Search</Link>
          <Link onClick={this.changePage} to="/login" className='link -secondary'>Log in</Link>
          <Link onClick={this.changePage} to="/signup" className='link -secondary'>Sign up</Link>
        </div>
      );
    }
  }
}

Nav.propTypes = {
  changePage: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    changePage: actions.changePage
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(Nav);
