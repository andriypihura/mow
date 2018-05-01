import React, { Component } from 'react';
import { pageWrapper } from './page.js';
import { Link } from 'react-router-dom';
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
import HandleErrors from './../helpers/error-handler.js';

class Recipe extends Component{

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: {},
      likes_count: 0,
      liked: false,
      openMenusDropdown: false,
      menus: [],
      comments: [],
      deleted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.likeRecipe = this.likeRecipe.bind(this);
    this.toogleMenusDropdown = this.toogleMenusDropdown.bind(this);
    this.addToMenu = this.addToMenu.bind(this);
  }

  likeRecipe(event) {
    const { id } = this.state.item
    fetch(`${process.env.REACT_APP_APIURL}/likes`,
          { method: 'post',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "recipe_id": id })
          })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        const { value } = response
        this.setState({
          liked: value,
          likes_count: this.state.likes_count + (value ? 1 : -1)
        })
      })
      .catch(error => this.setState({ error: error }))
  }

  toogleMenusDropdown(event) {
    if(this.state.openMenusDropdown){
      this.setState({
        openMenusDropdown: false
      })
      return
    }
    fetch(`${process.env.REACT_APP_APIURL}/users/${sessionStorage.getItem('user')}/menus`,
          { method: 'get',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          openMenusDropdown: true,
          menus: response.menus
        })
      })
      .catch(error => this.setState({ error: error }))
  }

  addToMenu(event) {
    let menu_id = event.target.dataset.id
    fetch(`${process.env.REACT_APP_APIURL}/users/${sessionStorage.getItem('user')}/menus/${menu_id}/menu_items`,
          { method: 'post',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"recipe_id": this.state.item.id, secondary_label: 1, primary_label: 'Sunday' })
          })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          openMenusDropdown: false
        })
      })
      .catch(error => this.setState({ error: error }))
  }

  handleKeyDown(event) {
    if(event.keyCode == 13 && event.ctrlKey)
      this.handleSubmit(event)
  }

  handleSubmit(event) {
    event.preventDefault();
    const { message, recipe_id } = this.refs
    fetch(`${process.env.REACT_APP_APIURL}/recipes/${recipe_id.value}/comments`,
          { method: 'post',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "message": message.value })
          })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        message.value = ''
        this.setState({
          comments: [response, ...this.state.comments]
        })
      })
      .catch(error => this.setState({ error: error }))
  }

  onDelete(event) {
    fetch(`${process.env.REACT_APP_APIURL}/recipes/${this.props.match.params.id}`,
          { method: 'delete',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          deleted: true
        })
      })
      .catch(error => this.setState({ error: error }))
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_APIURL}/recipes/${this.props.match.params.id}`,
          { method: 'get',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          isLoaded: true,
          item: response.recipe,
          likes_count: response.recipe.likes_count,
          liked: response.recipe.liked,
          comments: response.recipe.comments
        });
      })
      .catch(error => this.setState({ isLoaded: true, error: error }))
  }

  render(){
    const { deleted, error, isLoaded, item, comments, liked, likes_count, openMenusDropdown, menus } = this.state;
    if (error) {
      return <Redirect to={`/error/${error.code}/${error.message}`} />;
    } else if (deleted) {
      return <Redirect to='/' />;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      const recipeImage = {
        backgroundImage: `url(${item.image || DefaultImage})`
      };

      return (
        <div className='recipe'>
          <div className='recipe--inner'>
            <div className='recipe--inner-col -bigger'>
              <div className='recipe--header' style={recipeImage}>
                <div className='recipe--header-top-menu'>
                  {(sessionStorage.getItem('admin') || item.user.id == sessionStorage.getItem('user')) &&
                    <div
                      className='link'
                      onClick={(event) => { if(window.confirm('Are you sure you wish to delete this item?')) this.onDelete(event)}}>
                      Delete recipe
                    </div>
                  }
                  {(sessionStorage.getItem('admin') || item.user.id == sessionStorage.getItem('user')) &&
                    <Link to={`/recipes/${item.id}/edit`} className='link'>Edit recipe</Link>
                  }
                  <Moment format="DD.MM.YYYY" className='recipe--info-date'>
                    {item.created_at}
                  </Moment>
                </div>
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
                    <div className='recipe--sidebar-info-menu-item' data-liked={liked}>
                      <div className='recipe--sidebar-info-menu-item-inner' onClick={this.likeRecipe}>
                        <FontAwesomeIcon icon={liked ? faHeartSolid : faHeartRegular} />
                        <span>{likes_count || 0}</span>
                      </div>
                    </div>
                    <div className='recipe--sidebar-info-menu-item'>
                      <div className='recipe--sidebar-info-menu-item-inner' onClick={this.toogleMenusDropdown}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Add to menu</span>
                      </div>
                      {openMenusDropdown &&
                        <div className='recipe--sidebar-menus'>
                          {menus.map((o, i) =>
                            <div className='recipe--sidebar-menus-item' key={i} data-id={o.id} onClick={this.addToMenu}>{o.title}</div>)}
                          {!menus.length && <div className='recipe--sidebar-menus-item'>No-no-no</div>}
                        </div>}
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
                        onKeyDown={this.handleKeyDown}
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
