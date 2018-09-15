import React, { Component } from 'react';
import RecipePreview from './../atoms/recipe-preview.js';
import Loader from './../atoms/loader.js';
import HandleErrors from './../helpers/error-handler.js';
import config from './../../config.js';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.props.setTitle('Home');
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
        <div className='flex-container'>
          {items.map((object, i) => <RecipePreview key={i} item={object} />)}
        </div>
      );
    }
  }
}

Home.propTypes = {
  setTitle: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setTitle: actions.setTitle
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(Home);
