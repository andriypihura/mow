import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { pageWrapper } from './page.js';
import './../css/login.css';
import './../css/form.css';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.setState({submitted: true});
  }

  render() {
    const { submitted } = this.state;
    if(localStorage.getItem('token'))
      return (
        <div className="login">
          <div className="login--card">
            <h1>Are you sure?</h1>
            <form className="form" onSubmit={this.handleSubmit}>
              <input
                className="form--submit"
                value="SUBMIT"
                type="submit"
              />
            </form>
            {submitted && (<Redirect to='/'/>)}
          </div>
        </div>
      );
    return <Redirect to="/" />;
  }
}

export default pageWrapper(Logout);
