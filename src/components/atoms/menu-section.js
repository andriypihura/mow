import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './menu-item.js';
import './../../css/menu.css';

class MenuSection extends Component{

  buildGroupedMenuDataByTime(data) {
    return ['1', '2', '3', '4', '5'].map((t) =>
      data.filter((item) => item.secondary_label == t)
    );
  }

  render(){
    const { menuItems, day, menuId } = this.props;
    const groupedMenuItemsByTime = this.buildGroupedMenuDataByTime(menuItems);

    return (
      <div className='menu--section'>
        <div className='menu--section-title'>{day}</div>
        {
          groupedMenuItemsByTime.map((menuItemsGroup, i) =>
            menuItemsGroup[0] && <div className='menu--section-row' key={i}>
              <div className='menu--section-row-number'>{menuItemsGroup[0].secondary_label}</div>
              <div className='menu--section-row-body'>
                {menuItemsGroup.map((item, j) =>
                  <MenuItem
                    key={j}
                    menuId={menuId}
                    menuItem={item}
                    onMenuItemChangeCallback={this.props.onMenuItemChangeCallback} />
                )}
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

MenuSection.propTypes = {
  menuItems: PropTypes.array,
  day: PropTypes.string,
  menuId: PropTypes.number,
  onMenuItemChangeCallback: PropTypes.func
};

export default MenuSection;
