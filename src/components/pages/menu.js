import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { pageWrapper } from './page.js';
import { Redirect } from 'react-router-dom';
import './../../css/menu.css';
import Loader from './../atoms/loader.js';
import MenuSection from './../atoms/menu-section.js';
import HandleErrors from './../helpers/error-handler.js';
import config from './../../config.js';

class Menu extends Component{

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      menu: {},
      menu_items: [],
      groupedMenuItemsByDay: []
    };
  }

  componentDidMount() {
    this.fetchMenuItemsData();
  }

  fetchMenuItemsData() {
    fetch(`${config.REACT_APP_APIURL}/users/${sessionStorage.getItem('user')}/menus/${this.props.match.params.id}`,
      { method: 'get',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          isLoaded: true,
          menu: response.menu,
          menuItems: response.menu.menu_items,
          groupedMenuItemsByDay: this.buildGroupedMenuDataByDay(response.menu.menu_items)
        });
      })
      .catch(error => this.setState({ isLoaded: true, error: error }));
  }

  handleMenuItemChangeCallback() {
    this.fetchMenuItemsData();
  }

  buildGroupedMenuDataByDay(data) {
    let result = {};
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) =>
      result[d] = data.filter((item) => item.primary_label == d)
    );
    return result;
  }

  render(){
    const { error, isLoaded, menu, groupedMenuItemsByDay } = this.state;

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
          <Scrollbars
            renderTrackVertical={props => <div {...props} className="track-vertical" style={{display:"none"}}/>}
            renderThumbVertical={props => <div {...props} className="thumb-vertical" style={{display:"none"}}/>}
            universal>
            <div className='menu--sections'>
              {Object.keys(groupedMenuItemsByDay).map((key, i) =>
                <MenuSection
                  key={i}
                  day={key}
                  menuId={menu.id}
                  menuItems={groupedMenuItemsByDay[key]}
                  onMenuItemChangeCallback={this.handleMenuItemChangeCallback.bind(this)} />
              )}
            </div>
          </Scrollbars>
        </div>
      );
    }
  }
}

Menu.propTypes = {
  match: PropTypes.object
};

export default pageWrapper(Menu, true);
