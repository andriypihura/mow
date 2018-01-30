import React, { Component } from 'react';
import './../../css/home.css';
import RecipePreview from './../atoms/recipe-preview.js';


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
      return <div>Loading...</div>;
    } else {
      return (
        <div className='app--body home'>
          <div className='home--recipes'>
            {items.map((object, i) => <RecipePreview key={i} item={object} />)}
          </div>
        </div>
      );
    }
  }
}
export default Home;
