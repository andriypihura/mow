import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { pageWrapper } from './page.js'
import './../../css/login.css';
import './../../css/form.css';
import HandleErrors from './../helpers/error-handler.js';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      errors: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password, user_name, password_confirmation } = this.refs
    fetch(`${process.env.REACT_APP_APIURL}/users`,
          { method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "name": user_name.value,
              "email": email.value,
              "password": password.value,
              "password_confirmation": password_confirmation.value
            })
          })
      .then(HandleErrors)
      .then(res => res.json())
      .then((result) => {
        this.setState({submitted: true});
      })
      .catch(error => this.setState({ errors: true }))
  }

  render() {
    const { submitted, errors } = this.state
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
                  ref='user_name'
                  type="text"
              />
              <input
                  className="form--item"
                  placeholder="Email goes here..."
                  name="email"
                  ref='email'
                  type="email"
              />
              <input
                  className="form--item"
                  placeholder="Password goes here..."
                  name="password"
                  ref='password'
                  type="password"
              />
              <input
                  className="form--item"
                  placeholder="Password goes here..."
                  name="password_confirmation"
                  ref='password_confirmation'
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
