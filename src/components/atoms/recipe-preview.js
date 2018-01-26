import React, { Component } from 'react';
import './../../css/recipe-preview.css';
import DefaultImage from './../../images/no-image.png';

class RecipePreview extends Component{
  render(){
    const recipeImage = {
      backgroundImage: `url(${this.props.item.image || DefaultImage})`
    };
    return (
      <div className="recipe-preview">
        <div className="recipe-preview--inner" style={recipeImage}>
          <div className="recipe-preview--image">
          </div>
          <div className="recipe-preview--text">
            <div className="recipe-preview--labels">
              <div className="recipe-preview--labels-item">
                {this.props.item.complexity || 'easy'}
              </div>
              <div className="recipe-preview--labels-item">
                {this.props.item.calories || 0} kkal
              </div>
            </div>
            <div className="recipe-preview--title">
              {this.props.item.title}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default RecipePreview;
