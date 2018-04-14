import React, { Component } from 'react';
import { pageWrapper } from './page.js';
import { Redirect } from 'react-router-dom';
import './../../css/menu.css';
import Loader from './../atoms/loader.js';
import MenuItem from './../atoms/menu-item.js';
import HandleErrors from './../helpers/error-handler.js';

class Menu extends Component{

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      menu: {},
      menu_items: []
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_APIURL}/users/${sessionStorage.getItem('user')}/menus/${this.props.match.params.id}`,
          { method: 'get',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        console.log(response);
        this.setState({
          isLoaded: true,
          menu: response.menu,
          menu_items: response.menu.menu_items
        });
      })
      .catch(error => this.setState({ isLoaded: true, error: error }))
  }

  render(){
    const { error, isLoaded, menu, menu_items } = this.state;
    if (error) {
      return <Redirect to={`/error/${error.code}/${error.message}`} />;
    } else if (!isLoaded) {
      return <Loader />;
    } else {

      return (
        <div className='menu'>
          <div className='menu--title-line'>
            <div className='menu--title'>
              {menu.title}
            </div>
          </div>
          <div className='menu--sections'>
            <div className='menu--sections-inner'>
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d, i) =>
                <div className='menu--section' key={i}>
                  <div className='menu--section-title'>{d}</div>
                  {menu_items.map((item, j) => item.primary_label == d && <MenuItem key={j} menu_item={item} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}
export default pageWrapper(Menu, true);
