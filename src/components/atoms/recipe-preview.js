import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import './../../css/recipe-preview.css';
// import './../../css/link.css';
import defaultImage from './../../images/no-image.png';

class RecipePreview extends Component{
  text_truncate(str, num, max) {
    if(str.length < max) return str;
    return str.slice(0,num) + ' ...';
  }

  render(){
    const { showIngredients } = this.props;
    const { id, title, complexity, calories, image, time_consuming, ingredients } = this.props.item;
    const recipeImage = { backgroundImage: `url(${image || defaultImage})` };


    return (
      <div className="recipe-preview">
        <div className="recipe-preview--inner" style={recipeImage}>
          {showIngredients && <div className='recipe-preview--ingredients-title'>Ingredients: </div> }
          <ul className={`recipe-preview--ingredients ${showIngredients && '-bg'}`}>
            {showIngredients && ingredients.split(',').map((obj, i) => <li key={i}>{obj}</li>)}
          </ul>
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
              <Link to={`/recipes/${id}`} className='link -additional'>
                {this.text_truncate(title, 19, 22)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RecipePreview.propTypes = {
  showIngredients: PropTypes.bool,
  item: PropTypes.object
};

export default RecipePreview;
