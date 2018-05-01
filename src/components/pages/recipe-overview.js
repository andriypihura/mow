import React, { Component } from 'react';
import './../../css/recipe-overview.css';
import RecipePreview from './../atoms/recipe-preview.js';
import { pageWrapper } from './page.js'
import Loader from './../atoms/loader.js';
import HandleErrors from './../helpers/error-handler.js';

class RecipeOverview extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      page: 1,
      newRecipesReady: false,
      pageCount: 2,
      type: 'my'
    };
    this.loadMore = this.loadMore.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.changeType = this.changeType.bind(this);
  }

  loadMore(page) {
    if(!page) page = 1
    this.setState({ newRecipesReady: false })
    if(this.state.pageCount < page)
      return false;

    fetch(`${process.env.REACT_APP_APIURL}/recipes/overview?page=${page}&type=${this.state.type}`,
          { method: 'get',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
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
      .catch(error => this.setState({ isLoaded: true, error: error }))
  }

  componentDidMount() {
    this.loadMore(1);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    let scrollTop = document.documentElement.scrollTop
    let targetOffsetTop = document.getElementById('js-mark-bottom').offsetTop
    if(targetOffsetTop - scrollTop - window.innerHeight < 500 && this.state.newRecipesReady){
      this.loadMore(this.state.page + 1);
    }
  }

  changeType (newType) {
    console.log('before change');
    console.log(this.state.type);
    this.setState(
      {
        type: this.state.type === 'my' ? 'likes' : 'my',
        items: [],
        page: 1,
        pageCount: 2
      },
      this.loadMore
    )
  }

  render(){
    const { error, isLoaded, items, type } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className='recipe-overview'>
          <div className='recipe-overview--switch-type'>
            <div className={`recipe-overview--switch-type-item ${type === 'my'}`} onClick={(event) => {if (type !== 'my') this.changeType(event)}}>
              Own recipes
            </div>
            <div className={`recipe-overview--switch-type-item ${type === 'likes'}`} onClick={(event) => {if (type !== 'likes') this.changeType(event)}}>
              My likes
            </div>
          </div>
          <div className='recipe-overview--list'>
            {items.map((object, i) => <RecipePreview key={i} item={object} />)}
            <div id='js-mark-bottom'></div>
          </div>
        </div>
      );
    }
  }
}
export default pageWrapper(RecipeOverview);
