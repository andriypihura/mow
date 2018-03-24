import React, { Component } from 'react';
import Moment from 'react-moment';
import DefaultImage from './../../images/no-image.png';
import './../../css/comment.css';

class Comment extends Component{
  render(){
    const { comment } = this.props;
    const avatar = {
      backgroundImage: `url(${comment.user.avatar_url || DefaultImage})`
    };

    return (
      <div className='comment'>
        <div className='comment--avatar' style={avatar}>
        </div>
        <div className='comment--block'>
          <div className='comment--info'>
            <div className='comment--info-author'>
              {comment.user.name}
            </div>
            <Moment format="DD.MM.YYYY" className='comment--info-date'>
              {comment.created_at}
            </Moment>
          </div>
          <div className='comment--message'>
            {comment.message}
          </div>
        </div>
      </div>
    );
  }
}
export default Comment;
