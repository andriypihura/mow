import React, { Component } from 'react';
import { pageWrapper } from './page.js';
import { Redirect } from 'react-router-dom';
import './../../css/menus.css';
import DefaultImage from './../../images/no-image.png';
import Loader from './../atoms/loader.js';
import MenuPreview from './../atoms/menu-preview.js';
import HandleErrors from './../helpers/error-handler.js';

class Menus extends Component{

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      menus: []
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_APIURL}/users/${sessionStorage.getItem('user')}/menus`,
          { method: 'get',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          isLoaded: true,
          menus: response.menus
        });
      })
      .catch(error => this.setState({ isLoaded: true, error: error }))
  }

  render(){
    const { error, isLoaded, menus } = this.state;
    if (error) {
      return <Redirect to={`/error/${error.code}/${error.message}`} />;
    } else if (!isLoaded) {
      return <Loader />;
    } else {

      return (
        <div className='menus'>
          {menus.map((object, i) => <MenuPreview key={i} item={object} />)}
        </div>
      );
    }
  }
}
export default pageWrapper(Menus);
