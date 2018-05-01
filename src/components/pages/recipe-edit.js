import React, { Component } from 'react';
import { pageWrapper } from './page.js';
import './../../css/recipe-edit.css';
import DefaultImage from './../../images/no-image.png';
import { Redirect } from 'react-router-dom';
import Loader from './../atoms/loader.js';
import HandleErrors from './../helpers/error-handler.js';

class RecipeEdit extends Component{

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      updated: false,
      isLoaded: false,
      createMod: false,
      item: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.match.params.id){
      this.setState({isLoaded: true, createMod: true})
      return
    }
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
          item: response.recipe
        });
      })
      .catch(error => this.setState({ error: error }))
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(new FormData(event.target));
    let data = this.buildDataToSend(event.target.elements);
    let fetchUrl = `${process.env.REACT_APP_APIURL}/recipes/${this.state.item.id}`
    let fetchMethod = this.state.createMod ? 'post' :'put'
    if (this.state.createMod)
      fetchUrl = `${process.env.REACT_APP_APIURL}/recipes`
    console.log(fetchUrl);
    console.log(fetchMethod);
    fetch(fetchUrl,
          { method: fetchMethod,
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: new FormData(event.target)
          })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          updated: true,
          item: response.recipe
        })
      })
      .catch(error => this.setState({ error: error }))
  }

  buildDataToSend(data) {
    let newData = { page: 1 }
    const valuesArray =
      [
        'user_id',
        'title',
        'time_consuming',
        'calories',
        'complexity',
        'text',
        'ingredients',
        'image'
      ]
    console.log(data['image']);
    for(let key of valuesArray){
      if(data[key] && data[key].value){
        newData[key] = data[key].value
      }
    }
    return newData;
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
      const recipeImage = {
        backgroundImage: `url(${item.image || DefaultImage})`
      };

      return (
        <div className='recipe-edit'>
          <div className='recipe-edit--title'>{createMod ? 'Create recipe' : 'Edit recipe'}</div>
          <form className="recipe-edit--form" onSubmit={this.handleSubmit}>
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
                    selected={item.complexity == 'hard'}
                />
                <label htmlFor="complexityHard">Hard</label>
                <input
                    id="complexityNormal"
                    name="complexity"
                    value='normal'
                    type="radio"
                    selected={item.complexity == 'normal'}
                />
                <label htmlFor="complexityNormal">Normal</label>
                <input
                    id="complexityEasy"
                    name="complexity"
                    value='easy'
                    type="radio"
                    selected={item.complexity == 'easy'}
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
export default pageWrapper(RecipeEdit);
