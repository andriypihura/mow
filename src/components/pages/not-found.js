import React, { Component } from 'react';
import { pageWrapper } from './page.js'
import './../../css/not-found.css';

class NotFound extends Component{
  render(){
    return (
      <div className='not-found'>
        <div className='not-found--smile'> :( 404 </div>
        <div className='not-found--text'>
          <div className='not-found--text-header'>
            Not Found
          </div>
          <div className='not-found--text-description'>
            {`And it's your fault`}
          </div>
        </div>
      </div>
    );
  }
}
export default pageWrapper(NotFound);
