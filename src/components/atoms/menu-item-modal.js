import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../css/menu-item-modal.css';
import './../../css/label.css';
import './../../css/recipe-preview.css';
import DefaultImage from './../../images/no-image.png';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/fontawesome-free-regular'
import RecipePreview from './recipe-preview.js';
import HandleErrors from './../helpers/error-handler.js';

class MenuItemModal extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    }
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleUpdate(event) {
    event.preventDefault();
    const { secondary_label, primary_label } = this.refs
    fetch(`${process.env.REACT_APP_APIURL}/users/${sessionStorage.getItem('user')}/menus/${this.props.menu_id}/menu_items/${this.props.menu_item.id}`,
          { method: 'put',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"secondary_label": secondary_label.value,
                                  "primary_label": primary_label.value })
          })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          isLoaded: true
        })
      })
      .catch(error => console.log(error))
  }

  handleDelete(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_APIURL}/users/${sessionStorage.getItem('user')}/menus/${this.props.menu_id}/menu_items/${this.props.menu_item.id}`,
          { method: 'delete',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          isLoaded: true
        })
      })
      .catch(error => console.log(error))
  }

  render(){
    const { id, created_at, primary_label, secondary_label  } = this.props.menu_item

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
          <RecipePreview item={this.props.menu_item.recipe} showIngredients={true} />
          <div className="menu-item-modal--section-title">Edit menu item:</div>
          <form className="form menu-item-modal--form" onSubmit={this.handleUpdate}>
            <select className="form--item"
                    name="secondary_label"
                    ref='secondary_label'
                    type="text"
                    defaultValue={secondary_label}>
              {[1,2,3,4,5].map((d, i) =>
                <option value={d} key={i}>{`${d} time`}</option>
              )}
            </select>
            <select className="form--item"
                    name="primary_label"
                    ref='primary_label'
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
export default MenuItemModal;
