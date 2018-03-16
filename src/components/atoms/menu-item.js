import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../css/recipe-preview.css';
import './../../css/link.css';
import DefaultImage from './../../images/no-image.png';

class MenuItem extends Component{
  text_truncate = (str, num, max) => {
    if(str.length < max){
      return str
    } else {
      return str.slice(0,num) + ' ...'
    }
  }

  render(){
    const { id, created_at  } = this.props.menu_item
    const { title, complexity, calories, image, time_consuming } = this.props.menu_item.recipe

    return (
      <div className="recipe-preview -menu-item">
        <div className="recipe-preview--inner">
          <div className="recipe-preview--text">
            <div className="recipe-preview--labels">
              <div className="label">
                {time_consuming || '<10'} m
              </div>
              <div className="label">
                {complexity || 'easy'}
              </div>
              <div className="label">
                {calories || 0} kkal
              </div>
            </div>
            <div className="recipe-preview--title">
              {this.text_truncate(title, 15, 18)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MenuItem;
