import React, { Component } from 'react';
import Nav from './../atoms/nav.js';
import Footer from './../atoms/footer.js';
import HandleErrors from './../helpers/error-handler.js';

export const pageWrapper = (WrappedComponent, secondary) => {
  class Wrapper extends Component {
    checkauth() {
      fetch(`http://localhost:5000/checkauth`,
            { method: 'get',
              headers: {
                "Authorization": `Beablabla ${localStorage.getItem('token')}`
              }
            })
        .then(HandleErrors)
        .then(res => res.json())
        .then((result) => {
          sessionStorage.setItem('user', result.user.id)
        })
        .catch((error) => {
          localStorage.removeItem('token')
          sessionStorage.removeItem('user')
        })
    }

    render() {
      if(localStorage.getItem('token') && !sessionStorage.getItem('user'))
        this.checkauth();
      return (
        <div className={secondary && `app--inner -secondary` || `app--inner`}>
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
}
