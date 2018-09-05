import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import './../../css/menu-item-modal.css';
// import './../../css/label.css';
// import './../../css/recipe-preview.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/fontawesome-free-regular';
import RecipePreview from './recipe-preview.js';
import HandleErrors from './../helpers/error-handler.js';
import config from './../../config.js';

class MenuItemModal extends Component{

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleUpdate(event) {
    event.preventDefault();
    fetch(`${config.REACT_APP_APIURL}/users/${sessionStorage.getItem('user')}/menus/${this.props.menuId}/menu_items/${this.props.menuItem.id}`,
      { method: 'put',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'secondary_label': this.secondaryLabel.value,
          'primary_label': this.primaryLabel.value
        })
      })
      .then(HandleErrors)
      .then(res => res.json())
      .then(this.props.onChangeCallback)
      .then(this.props.onClose)
      .catch(error => this.setState({ isLoaded: true, error: error }));
  }

  handleDelete(event) {
    event.preventDefault();
    fetch(`${config.REACT_APP_APIURL}/users/${sessionStorage.getItem('user')}/menus/${this.props.menuId}/menu_items/${this.props.menuItem.id}`,
      { method: 'delete',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(HandleErrors)
      .then(res => res.json())
      .then(this.props.onChangeCallback)
      .then(this.props.onClose)
      .catch(error => this.setState({ isLoaded: true, error: error }));
  }

  render(){
    const { error  } = this.state;
    const { primary_label, secondary_label  } = this.props.menuItem;
    if (error) {
      return <Redirect to={`/error/${error.code}/${error.message}`} />;
    } else {
      return (
        <div className="menu-item-modal">
          <div className="menu-item-modal--overflow" onClick={this.props.onClose}>
          </div>
          <div className="menu-item-modal--content">
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="menu-item-modal--close"
              onClick={this.props.onClose} />
            <div className="menu-item-modal--title">Menu item</div>
            <RecipePreview item={this.props.menuItem.recipe} showIngredients={true} />
            <div className="menu-item-modal--section-title">Edit menu item:</div>
            <form className="form menu-item-modal--form" onSubmit={this.handleUpdate}>
              <select className="form--item"
                name="secondary_label"
                ref={(r) => this.secondaryLabel = r}
                type="text"
                defaultValue={secondary_label}>
                {[1,2,3,4,5].map((d, i) =>
                  <option value={d} key={i}>{`${d} time`}</option>
                )}
              </select>
              <select
                className="form--item"
                name="primary_label"
                ref={(r) => this.primaryLabel = r}
                type="text"
                defaultValue={primary_label}>
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d, i) =>
                  <option value={d} key={i}>{d}</option>
                )}
              </select>
              <input
                className="form--submit"
                value="SUBMIT"
                type="submit"
              />
            </form>
            <div className="menu-item-modal--section-title -secondary">or</div>
            <button className="form--submit -danger" onClick={this.handleDelete}>DELETE</button>
            {this.state.isLoaded && window.location.reload()}
          </div>
        </div>
      );
    }
  }
}

MenuItemModal.propTypes = {
  menuItem: PropTypes.object,
  menuId: PropTypes.number,
  onClose: PropTypes.func,
  onChangeCallback: PropTypes.func
};


export default MenuItemModal;
