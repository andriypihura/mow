import React, { Component } from 'react';
import './../../css/Recipe.css';

class Recipe extends Component{
  render(){
    return (
      <h2>Recipes-{this.props.match.params.type}</h2>
    );
  }
}
export default Recipe;
