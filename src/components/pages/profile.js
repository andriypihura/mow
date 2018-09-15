import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import defaultImage from './../../images/no-image.png';
import Loader from './../atoms/loader.js';
import HandleErrors from './../helpers/error-handler.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import { faEdit } from '@fortawesome/fontawesome-free-regular';
import config from './../../config.js';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

class Profile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: {},
      editNameMod: false,
      editEmailMod: false
    };
    this.editNameMod = this.editNameMod.bind(this);
    this.editEmailMod = this.editEmailMod.bind(this);
    this.submitNameChange = this.submitNameChange.bind(this);
    this.submitEmailChange = this.submitEmailChange.bind(this);
    this.handleSubmitAvatar = this.handleSubmitAvatar.bind(this);
    this.props.setTitle('Profile');
  }

  componentDidMount() {
    fetch(`${config.REACT_APP_APIURL}/checkauth`,
      {
        headers: {
          'Authorization': `Beablabla ${localStorage.getItem('token')}`
        }
      })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          isLoaded: true,
          item: response.user
        });
      })
      .catch(error => this.setState({ isLoaded: true, error: error }));
  }

  editNameMod() {
    this.setState({ editNameMod: true });
  }

  editEmailMod() {
    this.setState({ editEmailMod: true });
  }

  submitNameChange() {
    fetch(`${config.REACT_APP_APIURL}/users/${this.state.item.id}`,
      { method: 'put',
        headers: {
          'Authorization': `Beablabla ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'name': this.name.value })
      })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          item: response.user,
          editNameMod: false
        });
      })
      .catch(error => this.setState({ error: error }));
  }

  submitEmailChange() {
    fetch(`${config.REACT_APP_APIURL}/users/${this.state.item.id}`,
      { method: 'put',
        headers: {
          'Authorization': `Beablabla ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'email': this.email.value })
      })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          item: response.user,
          editEmailMod: false
        });
      })
      .catch(error => this.setState({ error: error }));
  }

  handleSubmitAvatar(event) {
    event.preventDefault();
    fetch(`${config.REACT_APP_APIURL}/users/${this.state.item.id}`,
      { method: 'put',
        headers: {
          'Authorization': `Beablabla ${localStorage.getItem('token')}`
        },
        body: new FormData(event.target)
      })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          item: response.user
        });
      })
      .catch(error => this.setState({ error: error }));
  }

  render(){
    const { error, isLoaded, item, editNameMod, editEmailMod } = this.state;
    if (error) {
      return <Redirect to={`/error/${error.code}/${error.message}`} />;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      const profileImage = {
        backgroundImage: `url(${item.avatar_url || defaultImage})`
      };

      return (
        <div className='profile'>
          <div className='profile--avatar' style={profileImage}></div>
          <div className='profile--info'>
            {!editNameMod &&
              <div className='profile--info-row -secondary'>
                <span>{item.name}</span>
                <FontAwesomeIcon icon={faEdit} className='icon' onClick={this.editNameMod} />
              </div>}
            {editNameMod &&
              <div className='profile--info-row -secondary'>
                <input
                  name='name'
                  ref={(r) => this.name = r}
                  type="text"
                  defaultValue={item.name}
                />
                <span className='link' onClick={this.submitNameChange}>Submit</span>
              </div>}
            <div className='profile--info-row'>
              <div className='profile--info-label'>
                Created at
              </div>
              <div className='profile--info-value'>
                <Moment format="DD.MM.YYYY" className='profile--info-date'>
                  {item.created_at}
                </Moment>
              </div>
            </div>
            <div className='profile--info-row'>
              <div className='profile--info-label'>
                Updated at
              </div>
              <div className='profile--info-value'>
                <Moment format="DD.MM.YYYY" className='profile--info-date'>
                  {item.updated_at}
                </Moment>
              </div>
            </div>
            <div className='profile--info-row'>
              <div className='profile--info-label'>
                Email
              </div>
              {!editEmailMod &&
                <div className='profile--info-value'>
                  <span>{item.email}</span>
                  <FontAwesomeIcon icon={faEdit} className='icon' onClick={this.editEmailMod} />
                </div>}
              {editEmailMod &&
                <div className='profile--info-row'>
                  <input
                    name="email"
                    ref={(r) => this.email = r}
                    type="email"
                    defaultValue={item.email}
                  />
                  <span className='link' onClick={this.submitEmailChange}>Submit</span>
                </div>}
            </div>
            <form className="profile--info-row -form" onSubmit={this.handleSubmitAvatar}>
              <label className="profile--info-label" htmlFor='avatar_url'>
                Change avatar
              </label>
              <div className="profile--info-value">
                <input
                  className="form--item -file"
                  name="avatar_url"
                  type="file" />
              </div>
              <input
                className="link"
                value="Submit"
                type="submit"
              />
            </form>
          </div>
        </div>
      );
    }
  }
}

Profile.propTypes = {
  setTitle: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setTitle: actions.setTitle
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(Profile);
