import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../../css/recipe-preview.css';
import MenuItemModal from './menu-item-modal.js';

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
  }

  handleClick() {
    this.setState({ modalOpened: true });
  }

  handleCloseClick(event) {
    if(event) event.stopPropagation();
    this.setState({ modalOpened: false });
  }

  handleOnMouseDown(event) {
    console.log(event.clientX, event.clientY);
  }

  text_truncate(str, num, max) {
    if(str.length < max){
      return str;
    } else {
      return str.slice(0,num) + ' ...';
    }
  }

  render(){
    const { modalOpened  } = this.state;
    const { menuId } = this.props;
    const { title, complexity, calories, time_consuming } = this.props.menuItem.recipe;

    return (
      <div className="recipe-preview -menu-item" onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseDown}>
        {modalOpened &&
          <MenuItemModal
            menuItem={this.props.menuItem}
            menuId={menuId}
            onClose={this.handleCloseClick.bind(this)}
            onChangeCallback={this.props.onMenuItemChangeCallback}/>}
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
              {this.text_truncate(title, 25, 28)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MenuItem.propTypes = {
  menuItem: PropTypes.object,
  menuId: PropTypes.number,
  onMenuItemChangeCallback: PropTypes.func
};

export default MenuItem;
