import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { pageWrapper } from './page.js'
import './../../css/login.css';
import './../../css/form.css';

class Login extends Component {
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
    const { email, password } = this.refs
    fetch(`http://localhost:5000/authenticate?email=${email.value}&password=${password.value}`,
          { method: 'post' })
      .then(res => res.json())
      .then(
        (result) => {
          localStorage.setItem('token', result.auth_token);
          this.setState({submitted: true});
        },
        (error) => {
          console.log('login errors:');
          console.log(error);
          this.setState({errors: true});
        }
      )
  }

  render() {
    const { submitted, errors } = this.state
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

export default pageWrapper(Login);
