import React, { Component } from 'react';
import Nav from './../atoms/nav.js';
import Footer from './../atoms/footer.js';
import HandleErrors from './../helpers/error-handler.js';
import config from './../../config.js';

export const pageWrapper = (WrappedComponent, secondary) => {
  class Wrapper extends Component {
    checkauth() {
      fetch(`${config.REACT_APP_APIURL}/checkauth`,
        { method: 'get',
          headers: {
            'Authorization': `Beablabla ${localStorage.getItem('token')}`
          }
        })
        .then(HandleErrors)
        .then(res => res.json())
        .then((result) => {
          sessionStorage.setItem('user', result.user.id);
          if(result.user.roles && result.user.roles.includes('admin')){
            sessionStorage.setItem('admin', true);
          } else {
            sessionStorage.removeItem('admin');
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('admin');
        });
    }

    render() {
      if(localStorage.getItem('token') && !sessionStorage.getItem('user'))
        this.checkauth();
      return (
        <div className={secondary && 'app--inner -secondary' || 'app--inner'}>
          <Nav />
          <div className='app--body'>
            <WrappedComponent {...this.props}/>
          </div>
          {!secondary && <Footer />}
        </div>
      );
    }
  }
  return Wrapper;
};
