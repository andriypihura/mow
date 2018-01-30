import React, { Component } from 'react';
import './../../css/recipe.css';
import './../../css/label.css';
import DefaultImage from './../../images/no-image.png';

class Recipe extends Component{

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: {}
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/recipes/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            item: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render(){

    const { error, isLoaded, item } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const recipeImage = {
        backgroundImage: `url(${item.image || DefaultImage})`
      };

      return (
        <div className='app--body recipe'>
          <div className='recipe--inner'>
            <div className='recipe--inner-col -bigger'>
              <div className='recipe--header' style={recipeImage}>
                <div className='recipe--header-info'>
                  <div className='recipe--header-info-title'>
                    {item.title}
                  </div>
                </div>
              </div>
              <div className='recipe--description'>
                <div className='recipe--labels'>
                  <div className='label -bigger'>{item.complexity || 'easy'}</div>
                  <div className='label -bigger'>{item.calories || '0'}kkal</div>
                  <div className='label -bigger'>{item.time_consuming || '<10'}min</div>
                </div>
                <div className='recipe--description-text'>
                  {item.text}
                </div>
              </div>
            </div>
            <div className='recipe--inner-col -smaller'>
              <div className='recipe--sidebar'>
                <div className='recipe--ingredients'>
                  <div className='recipe--ingredients-header'>Ingredients</div>
                  <ul className='recipe--ingredients-list'>
                    {item.ingredients.split(',').map((obj, i) => <li key={i}>{obj}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default Recipe;
