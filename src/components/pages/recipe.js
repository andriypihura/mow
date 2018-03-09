import React, { Component } from 'react';
import { pageWrapper } from './page.js'
import './../../css/recipe.css';
import './../../css/label.css';
import DefaultImage from './../../images/no-image.png';
import Loader from './../atoms/loader.js';
import Comment from './../atoms/comment.js';

class Recipe extends Component{

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: {},
      comments: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { message, recipe_id } = this.refs
    fetch(`http://localhost:5000/recipes/${recipe_id.value}/comments`,
          { method: 'post',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "message": message.value })
          })
      .then(res => res.json())
      .then(
        (responce) => {
          this.setState({
            comments: [responce, ...this.state.comments]
          })
        },
        (error) => {
          console.log(error);
        }
      )
  }

  componentDidMount() {
    fetch(`http://localhost:5000/recipes/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(
        (responce) => {
          this.setState({
            isLoaded: true,
            item: responce.recipe,
            comments: responce.recipe.comments
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

    const { error, isLoaded, item, comments } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      const recipeImage = {
        backgroundImage: `url(${item.image || DefaultImage})`
      };

      const date = new Date(Date.parse(item.created_at));
      const formattedDate = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join(':');

      return (
        <div className='recipe'>
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
                <div className='recipe--description-text'>
                  {item.text}
                </div>
              </div>
              <div className='recipe--comments'>
                {comments.map((object, i) => <Comment key={i} comment={object} />)}
              </div>
            </div>
            <div className='recipe--inner-col -smaller'>
              <div className='recipe--sidebar'>
                <div className='recipe--sidebar-block'>
                  <div className='recipe--time'>{formattedDate}</div>
                  <div className='recipe--labels'>
                    <div className='label -bigger'>{item.complexity || 'easy'}</div>
                    <div className='label -bigger'>{item.calories || '0'}kkal</div>
                    <div className='label -bigger'>{item.time_consuming || '<10'}min</div>
                  </div>

                  <div className='recipe--ingredients-header'>Ingredients</div>
                  <ul className='recipe--ingredients-list'>
                    {item.ingredients.split(',').map((obj, i) => <li key={i}>{obj}</li>)}
                  </ul>
                </div>

                <div className='recipe--comment-form'>
                  <form className="form" onSubmit={this.handleSubmit}>
                    <input
                        className="form--item hidden"
                        name="recipe_id"
                        ref='recipe_id'
                        type="text"
                        defaultValue={item.id}
                    />
                      <textarea
                          className="form--item -textarea"
                          placeholder="Leave your comment here..."
                          name="message"
                          ref='message'
                          type="text"
                      />
                      <input
                          className="form--submit"
                          value="SUBMIT"
                          type="submit"
                      />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default pageWrapper(Recipe);
