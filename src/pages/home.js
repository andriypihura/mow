import React, { Component } from 'react';
import './../css/home.css';
import RecipePreview from './../atoms/recipe-preview.js';
import { pageWrapper } from './page.js';
import Loader from './../atoms/loader.js';
import HandleErrors from './../helpers/error-handler.js';
import config from './../config.js';

class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch(`${config.REACT_APP_APIURL}/recipes?page=1`)
      .then(HandleErrors)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          items: result.recipes
        });
      })
      .catch(error => this.setState({ isLoaded: true, error: error }));
  }

  render(){
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className='home'>
          <div className='home--recipes'>
            {items.map((object, i) => <RecipePreview key={i} item={object} />)}
          </div>
        </div>
      );
    }
  }
}
export default pageWrapper(Home);
