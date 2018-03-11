import React, { Component } from 'react';
import Nav from './../atoms/nav.js';
import Footer from './../atoms/footer.js';

export const pageWrapper = (WrappedComponent) => {
  class Wrapper extends Component {
    render() {
      return (
        <div className='app--inner'>
          <Nav />
          <div className='app--body'>
            <WrappedComponent {...this.props}/>
          </div>
          <Footer />
        </div>
      );
    }
  }
  return Wrapper;
}
