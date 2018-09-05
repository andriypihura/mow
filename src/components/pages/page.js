import React, { Component } from 'react';
import HandleErrors from './../helpers/error-handler.js';
import Dashboard from './dashboard.js';
import config from './../../config.js';

export const pageWrapper = (WrappedComponent) => {
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
          if(result.user.avatar_url)
            sessionStorage.setItem('user_avatar', result.user.avatar_url);
          if(result.user.roles && result.user.roles.includes('admin')){
            sessionStorage.setItem('admin', true);
          } else {
            sessionStorage.removeItem('admin');
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('user_avatar');
          sessionStorage.removeItem('admin');
        });
    }

    render() {
      if(localStorage.getItem('token') && !sessionStorage.getItem('user'))
        this.checkauth();
      return (
        <Dashboard>
          <WrappedComponent {...this.props}/>
        </Dashboard>
      );
    }
  }
  return Wrapper;
};
