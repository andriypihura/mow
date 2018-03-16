import React, { Component } from 'react';
import './../../css/error-page.css';
import { pageWrapper } from './page.js'

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
      </div>
    );
  }
}
export default pageWrapper(ErrorPage);
