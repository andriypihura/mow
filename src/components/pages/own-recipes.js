import React, { Component } from 'react';
import RecipePreview from './../atoms/recipe-preview.js';
import Loader from './../atoms/loader.js';
import HandleErrors from './../helpers/error-handler.js';
import config from './../../config.js';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

class RecipeOverview extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      page: 1,
      newRecipesReady: false,
      pageCount: 2
    };
    this.loadMore = this.loadMore.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleType = this.toggleType.bind(this);
    this.props.setTitle('Own recipes');
  }

  loadMore(page) {
    if (!page) page = 1;
    this.setState({ newRecipesReady: false });
    if (this.state.pageCount < page) return false;

    fetch(`${config.REACT_APP_APIURL}/recipes/overview?page=${page}&type=my`,
      { method: 'get',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(HandleErrors)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          items: this.state.items.concat(result.recipes),
          newRecipesReady: true,
          page: page,
          pageCount: result.pageCount
        });
      })
      .catch(error => this.setState({ isLoaded: true, error: error }));
  }

  componentDidMount() {
    this.loadMore(1);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const scrollTop = document.documentElement.scrollTop;
    const targetOffsetTop = document.getElementById('js-mark-bottom').offsetTop;
    if(targetOffsetTop - scrollTop - window.innerHeight < 500 && this.state.newRecipesReady)
      this.loadMore(this.state.page + 1);
  }

  toggleType() {
    this.setState(
      {
        items: [],
        page: 1,
        pageCount: 2
      },
      this.loadMore
    );
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
          <div id='js-mark-bottom'></div>
        </div>
      );
    }
  }
}

RecipeOverview.propTypes = {
  setTitle: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setTitle: actions.setTitle
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(RecipeOverview);
