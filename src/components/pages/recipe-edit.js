import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './../../css/recipe-edit.css';
import { Redirect } from 'react-router-dom';
import Loader from './../atoms/loader.js';
import HandleErrors from './../helpers/error-handler.js';
import config from './../../config.js';

class RecipeEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      updated: false,
      isLoaded: false,
      createMod: !this.props.match.params.id,
      item: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    const createMod = !this.props.match.params.id;
    if (createMod != this.state.createMod){
      this.setState({ createMod });
    }
  }
  componentDidMount() {
    if (!this.props.match.params.id){
      this.setState({isLoaded: true, createMod: true});
      return;
    }
    fetch(`${config.REACT_APP_APIURL}/recipes/${this.props.match.params.id}`,
      { method: 'get',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          isLoaded: true,
          item: response.recipe
        });
      })
      .catch(error => this.setState({ error: error }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const [fetchMethod, fetchUrl] =
      this.state.createMod
        ? ['post', `${config.REACT_APP_APIURL}/recipes`]
        : ['put', `${config.REACT_APP_APIURL}/recipes/${this.state.item.id}`];
    fetch(fetchUrl,
      { method: fetchMethod,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: new FormData(event.target)
      })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          updated: true,
          item: response.recipe
        });
      })
      .catch(error => this.setState({ error: error }));
  }

  render(){
    const { error, item, updated, isLoaded, createMod } = this.state;
    if (error) {
      return <Redirect to={`/error/${error.code}/${error.message}`} />;
    } else if (updated){
      return <Redirect to={`/recipes/${item.id}`} />;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className='recipe-edit'>
          <div className='recipe-edit--title'>{createMod ? 'Create recipe' : 'Edit recipe'}</div>
          <form className='recipe-edit--form' onSubmit={this.handleSubmit}>
            <input
              className="form--item hidden"
              name="user_id"
              type="text"
              defaultValue={sessionStorage.getItem('user')}
            />
            <div className="form--row">
              <label className="form--label" htmlFor='image'>
                Upload image
              </label>
              <div className="form--field">
                <input
                  className="form--item -file"
                  name="image"
                  type="file" />
              </div>
            </div>
            <div className="form--row">
              <label className="form--label" htmlFor='title'>
                Recipe title
              </label>
              <div className="form--field">
                <input
                  className="form--item"
                  name="title"
                  type="text"
                  defaultValue={item.title}
                />
              </div>
            </div>
            <div className="form--row">
              <label className="form--label" htmlFor='time_consuming'>
                Time consuming
              </label>
              <div className="form--field">
                <input
                  className="form--item"
                  name="time_consuming"
                  min="0"
                  type="number"
                  defaultValue={item.time_consuming}
                />
              </div>
            </div>
            <div className="form--row">
              <label className="form--label" htmlFor='calories'>
                Calories
              </label>
              <div className="form--field">
                <input
                  className="form--item"
                  name="calories"
                  min="0"
                  type="number"
                  defaultValue={item.calories}
                />
              </div>
            </div>
            <div className="form--row">
              <label className="form--label" htmlFor='time_consuming'>
                Complexity
              </label>
              <div className="form--field -radio-set">
                <input
                  id="complexityHard"
                  name="complexity"
                  value='hard'
                  type="radio"
                  defaultChecked={item.complexity == 'hard'}
                />
                <label htmlFor="complexityHard">Hard</label>
                <input
                  id="complexityNormal"
                  name="complexity"
                  value='normal'
                  type="radio"
                  defaultChecked={item.complexity == 'normal'}
                />
                <label htmlFor="complexityNormal">Normal</label>
                <input
                  id="complexityEasy"
                  name="complexity"
                  value='easy'
                  type="radio"
                  defaultChecked={item.complexity == 'easy'}
                />
                <label htmlFor="complexityEasy">Easy</label>
              </div>
            </div>
            <div className="form--row">
              <label className="form--label" htmlFor='text'>
                Directions
              </label>
              <div className="form--field">
                <textarea
                  className="form--item -textarea"
                  name="text"
                  type="text"
                  defaultValue={item.text}
                />
              </div>
            </div>

            <div className="form--row">
              <label className="form--label" htmlFor='ingredients'>
                Ingredients
                <br />
                (use comma as delimiter)
              </label>
              <div className="form--field">
                <textarea
                  className="form--item -textarea"
                  name="ingredients"
                  type="text"
                  defaultValue={item.ingredients}
                />
              </div>
            </div>
            <div className="form--row">
              <label className="form--label" htmlFor='calories'>
                Visibility
              </label>
              <div className="form--field -radio-set">
                <input
                  id="visibilityForSelf"
                  name="visibility"
                  value='for_self'
                  type="radio"
                  defaultChecked={item.visibility == 'for_self'}
                />
                <label htmlFor="complexityHard">For self</label>
                <input
                  id="visibilityPublic"
                  name="visibility"
                  value='public'
                  type="radio"
                  defaultChecked={item.visibility == 'public'}
                />
                <label htmlFor="complexityNormal">Public</label>
              </div>
            </div>
            <input
              className="form--submit"
              value="Submit"
              type="submit"
            />
          </form>
        </div>
      );
    }
  }
}

RecipeEdit.propTypes = {
  match: PropTypes.object
};

export default RecipeEdit;
