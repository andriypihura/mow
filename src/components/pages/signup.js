import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { pageWrapper } from './page.js';
import './../../css/login.css';
import './../../css/form.css';
import HandleErrors from './../helpers/error-handler.js';
import config from './../../config.js';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      errors: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`${config.REACT_APP_APIURL}/users`,
      { method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': this.user_name.value,
          'email': this.email.value,
          'password': this.password.value,
          'password_confirmation': this.password_confirmation.value
        })
      })
      .then(HandleErrors)
      .then(res => res.json())
      .then(() => {
        this.setState({submitted: true});
      })
      .catch(() => this.setState({ errors: true }));
  }

  render() {
    const { submitted, errors } = this.state;
    if(!localStorage.getItem('token'))
      return (
        <div className="login">
          <div className="login--card">
            <h1>Sign up</h1>
            {errors && <p>No-no-no, try again</p>}
            <form className="form" onSubmit={this.handleSubmit}>
              <input
                className="form--item"
                placeholder="Username goes here..."
                name="user_name"
                ref={(r) => this.user_name = r}
                type="text"
              />
              <input
                className="form--item"
                placeholder="Email goes here..."
                name="email"
                ref={(r) => this.email = r}
                type="email"
              />
              <input
                className="form--item"
                placeholder="Password goes here..."
                name="password"
                ref={(r) => this.password = r}
                type="password"
              />
              <input
                className="form--item"
                placeholder="Password goes here..."
                name="password_confirmation"
                ref={(r) => this.password_confirmation = r}
                type="password"
              />
              <input
                className="form--submit"
                value="SUBMIT"
                type="submit"
              />
            </form>
            {submitted && (<Redirect to='/login'/>)}
          </div>
        </div>
      );
    return <Redirect to="/" />;
  }
}

export default pageWrapper(Signup);
