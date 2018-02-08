import React, { Component } from 'react';
import './../../css/home.css';
import RecipePreview from './../atoms/recipe-preview.js';
import { pageWrapper } from './page.js'
import Loader from './../atoms/loader.js';

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
    fetch("http://localhost:5000/recipes?page=1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
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
