import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './../../css/menu-preview.css';

class MenuPreview extends Component{
  render(){
    const { id, title, created_at, updated_at, color } = this.props.item
    return (
      <div className='menu-preview'>
        <div className='menu-preview--title'>
          {title}
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

            <Link to={`/menu/${id}`} className='menu-preview--actions-item'>
              Edit menu
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default MenuPreview;
