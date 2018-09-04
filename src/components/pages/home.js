import React, { Component } from 'react';
import './../../css/home.css';
import { pageWrapper } from './page.js';

class Home extends Component{
  render(){
    return (
      <div className='home'>
        <div className='home--recipes'>
          Cool landing
        </div>
      </div>
    );
  }
}
export default pageWrapper(Home, true);
