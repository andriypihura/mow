import React, { Component } from 'react';
import DefaultImage from './../../images/no-image.png';
import './../../css/comment.css';

class Comment extends Component{
  render(){
    const avatar = {
      backgroundImage: `url(${this.props.comment.user.avatar_url || DefaultImage})`
    };

    return (
      <div className='comment'>
        <div className='comment--avatar' style={avatar}>
        </div>
        <div className='comment--block'>
          <div className='comment--author'>
            {this.props.comment.user.name}
          </div>
          <div className='comment--message'>
            {this.props.comment.message}
          </div>
        </div>
      </div>
    );
  }
}
export default Comment;
