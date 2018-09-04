import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../css/sidebar.css';

class Sidebar extends Component{
  render(){
    return (
      <div className='sidebar'>
        <div className='sidebar--logo'>
          <Link to="/" className='nav--link -logo'>MenuOnWeb logo</Link>
        </div>
        <Link to="/menus" className='sidebar--link'>Menus</Link>
        <Link to="/recipe-overview" className='sidebar--link'>Recipes</Link>
        <Link to="/recipe-overview" className='sidebar--link'>Favorites</Link>
        <Link to="/create-recipe" className='sidebar--link'>Add recipe</Link>
        <Link to="/profile" className='sidebar--link'>Profile</Link>
      </div>
    );
  }
}
export default Sidebar;
