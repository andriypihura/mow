import React, { Component } from 'react';
import './../../css/recipe-preview.css';
import MenuItemModal from './menu-item-modal.js';

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({ modalOpened: true })
  }

  handleCloseClick(event) {
    event.stopPropagation()
    this.setState({ modalOpened: false })
  }

  text_truncate = (str, num, max) => {
    if(str.length < max){
      return str
    } else {
      return str.slice(0,num) + ' ...'
    }
  }

  render(){
    const { modalOpened  } = this.state
    const { menu_id } = this.props
    const { id, created_at  } = this.props.menu_item
    const { title, complexity, calories, image, time_consuming } = this.props.menu_item.recipe

    return (
      <div className="recipe-preview -menu-item" onClick={this.handleClick}>
        {modalOpened && <MenuItemModal menu_item={this.props.menu_item} menu_id={menu_id} onClose={this.handleCloseClick.bind(this)}/>}
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
