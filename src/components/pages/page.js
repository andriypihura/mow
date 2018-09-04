import React, { Component } from 'react';
import TopNav from './../atoms/top-nav.js';
import Sidebar from './../atoms/sidebar.js';
import Footer from './../atoms/footer.js';
import HandleErrors from './../helpers/error-handler.js';
import config from './../../config.js';

export const pageWrapper = (WrappedComponent, landing) => {
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
        <div className={`app--inner ${landing && '-landing'}`}>
          {!landing && <Sidebar />}
          <div className='app--body'>
            {!landing && <TopNav />}
            <div className='app--body-inner'>
              <WrappedComponent {...this.props}/>
            </div>
          </div>
          {landing && <Footer />}
        </div>
      );
    }
  }
  return Wrapper;
};
