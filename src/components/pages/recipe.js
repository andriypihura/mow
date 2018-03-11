import React, { Component } from 'react';
import { pageWrapper } from './page.js';
import { Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid, faPlus, faPlusCircle } from '@fortawesome/fontawesome-free-solid'
import { faHeart as faHeartRegular } from '@fortawesome/fontawesome-free-regular'
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
      likes_count: 0,
      liked: false,
      user: false,
      redirect: false,
      comments: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.likeRecipe = this.likeRecipe.bind(this);
  }

  likeRecipe(event) {
    const { id, user } = this.state.item
    if(!this.state.user){
      this.setState({
        redirect: true
      })
      return false
    }
    fetch(`http://localhost:5000/likes`,
          { method: 'post',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "recipe_id": id })
          })
      .then(res => res.json())
      .then(
        (response) => {
          console.log(response);
          const { value } = response
          this.setState({
            liked: value,
            likes_count: this.state.likes_count + (value ? 1 : -1)
          })
        },
        (error) => {
          console.log(error);
        }
      )
  }

  handleSubmit(event) {
    event.preventDefault();
    const { message, recipe_id } = this.refs
    if(!this.state.user){
      this.setState({
        redirect: true
      })
      return false
    }
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
        (response) => {
          this.setState({
            comments: [response, ...this.state.comments]
          })
        },
        (error) => {
          console.log(error);
        }
      )
  }

  componentDidMount() {
    fetch(`http://localhost:5000/recipes/${this.props.match.params.id}`,
          { method: 'get',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
      .then(res => res.json())
      .then(
        (response) => {
          this.setState({
            isLoaded: true,
            item: response.recipe,
            likes_count: response.recipe.likes_count,
            liked: response.recipe.liked,
            user: response.recipe.user,
            comments: response.recipe.comments
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

    const { error, isLoaded, item, comments, liked, likes_count, redirect } = this.state;
    if (redirect) {
      return <Redirect to='/login'/>;
    } else if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      const recipeImage = {
        backgroundImage: `url(${item.image || DefaultImage})`
      };

      // const date = new Date(Date.parse(item.created_at));

      return (
        <div className='recipe'>
          <div className='recipe--inner'>
            <div className='recipe--inner-col -bigger'>
              <div className='recipe--header' style={recipeImage}>
                <Moment format="DD.MM.YYYY" className='recipe--info-date'>
                  {item.created_at}
                </Moment>
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
                  <div className='recipe--sidebar-info-menu'>
                    <div className='recipe--sidebar-info-menu-item' data-liked={liked} onClick={this.likeRecipe}>
                      <FontAwesomeIcon icon={liked ? faHeartSolid : faHeartRegular} />
                      <span>{likes_count || 0}</span>
                    </div>
                    <div className='recipe--sidebar-info-menu-item'>
                      <FontAwesomeIcon icon={faPlus} />
                      <span>Add to menu</span>
                    </div>
                  </div>
                  <div className='recipe--sidebar-block-inner'>
                    <div className='recipe--sidebar-header'>Labels</div>
                    <div className='recipe--labels'>
                      <div className='label -bigger'>{item.complexity || 'easy'}</div>
                      <div className='label -bigger'>{item.calories || '0'}kkal</div>
                      <div className='label -bigger'>{item.time_consuming || '<10'}min</div>
                    </div>

                    <div className='recipe--sidebar-header'>Ingredients</div>
                    <ul className='recipe--ingredients-list'>
                      {item.ingredients.split(',').map((obj, i) => <li key={i}>{obj}</li>)}
                    </ul>
                  </div>
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
