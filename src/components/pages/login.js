import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import './../../css/login.css';
// import './../../css/form.css';
import HandleErrors from './../helpers/error-handler.js';
import config from './../../config.js';

class Login extends Component {
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
    fetch(`${config.REACT_APP_APIURL}/authenticate`,
      { method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': this.email.value,
          'password': this.password.value
        })
      })
      .then(HandleErrors)
      .then(res => res.json())
      .then((result) => {
        localStorage.setItem('token', result.auth_token);
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
            <h1>Login</h1>
            {errors && <p>No-no-no, try again</p>}
            <form className="form" onSubmit={this.handleSubmit}>
              <input
                className="form--item"
                placeholder="Username goes here..."
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

export default Login;
