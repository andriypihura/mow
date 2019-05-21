import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../css/error-page.css';
import { Link } from 'react-router-dom';
import { pageWrapper } from './page.js';

class ErrorPage extends Component{
  render(){
    return (
      <div className='error-page'>
        <div className='error-page--smile'>
          :( {this.props.match.params.code || 404}
        </div>
        <div className='error-page--text'>
          <div className='error-page--text-header'>
            {this.props.match.params.message || 'Not Found'}
          </div>
        </div>
        {this.props.match.params.code == 401 &&
          <div className='error-page--button'>
            You need to
            <Link to="/login" className='link -pink'>log in</Link>
          </div>}
      </div>
    );
  }
}

ErrorPage.propTypes = {
  match: PropTypes.object
};

export default pageWrapper(ErrorPage);
