import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './../../css/menu-preview.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/fontawesome-free-regular'
import HandleErrors from './../helpers/error-handler.js';

class MenuPreview extends Component{
  constructor(props) {
    super(props);
    this.state = {
      editMod: false,
      menu: this.props.item
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.toogleEditMod = this.toogleEditMod.bind(this);
  }

  toogleEditMod(event) {
    if(this.state.editMod) this.handleUpdate()
    this.setState({
      editMod: !this.state.editMod
    })
  }

  handleUpdate() {
    const { title } = this.refs
    fetch(`${process.env.REACT_APP_APIURL}/users/${sessionStorage.getItem('user')}/menus/${this.props.item.id}`,
          { method: 'put',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"title": title.value })
          })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          editMod: false,
          menu: response.menu
        })
      })
      .catch(error => console.log(error))
  }

  render(){
    const { editMod } = this.state
    const { id, title, created_at, updated_at, color } = this.state.menu
    return (
      <div className='menu-preview'>
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="menu-preview--delete"
          onClick={() => {if(window.confirm('Are you sure you wish to delete this item?')) this.props.onDelete(id)}} />
        <div className='menu-preview--title'>
          {editMod && <input
              className="form--item"
              name="title"
              ref='title'
              type="text"
              defaultValue={title}
          /> || title}
        </div>
        <div className='menu-preview--info'>
          <div className='menu-preview--info-item'>
            <div className='menu-preview--info-label'>
              Created at
            </div>
            <Moment format="DD.MM.YYYY" className='menu-preview--info-text'>
              {created_at}
            </Moment>
          </div>

          <div className='menu-preview--info-item'>
            <div className='menu-preview--info-label'>
              Updated at
            </div>
            <Moment format="DD.MM.YYYY" className='menu-preview--info-text'>
              {updated_at}
            </Moment>
          </div>
        </div>
        <div className='menu-preview--actions'>
          <div className='menu-preview--actions-inner'>
            <Link to={`/menu/${id}`} className='menu-preview--actions-item'>
              View recipes
            </Link>

            <div className={`menu-preview--actions-item ${editMod && '-active'}`} onClick={this.toogleEditMod}>
              { editMod && 'Save' || 'Edit menu'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MenuPreview;
