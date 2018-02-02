import React, { Component } from 'react';
import './../../css/login.css';
import './../../css/form.css';

class Login extends Component {

  render() {
    return (
      <div className="app--body login">
        <div className="login--card">
          <h1>Login</h1>
          <form className="form">
              <input
                  className="form--item"
                  placeholder="Username goes here..."
                  name="username"
                  type="text"
              />
              <input
                  className="form--item"
                  placeholder="Password goes here..."
                  name="password"
                  type="password"
              />
              <input
                  className="form--submit"
                  value="SUBMIT"
                  type="submit"
              />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
