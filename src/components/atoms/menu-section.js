import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from './menu-item.js';
import './../../css/menu.css';

class MenuSection extends Component{

  groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  }

  render(){
    const { menu_items, day, menu_id } = this.props
    const grouped_menu_items = this.groupBy(menu_items, 'secondary_label')

    return (
      <div className='menu--section'>
        <div className='menu--section-title'>{day}</div>
        {
          ['1', '2', '3', '4', '5'].map((t, i) =>
            grouped_menu_items[t] &&
              <div className='menu--section-row'>
                <div className='menu--section-row-number'>{t}</div>
                <div className='menu--section-row-body'>
                  {grouped_menu_items[t].map((item, j) =>
                    <MenuItem key={j} menu_id={menu_id} menu_item={item} />
                  )}
                </div>
              </div>
          )
        }
      </div>
    );
  }
}
export default MenuSection;
