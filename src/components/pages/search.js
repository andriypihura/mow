import React, { Component } from 'react';
import './../../css/search.css';
import './../../css/form.css';
import RecipePreview from './../atoms/recipe-preview.js';
import { pageWrapper } from './page.js'
import Loader from './../atoms/loader.js';
import HandleErrors from './../helpers/error-handler.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/fontawesome-free-solid'

class Search extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      page: 1,
      filterData: {},
      newRecipesReady: false,
      pageCount: 2
    };
    this.filterResults = this.filterResults.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  filterResults(data) {
    this.setState({ newRecipesReady: false })
    if(this.state.pageCount <= this.state.page)
      return false;
    if(data){
      if(typeof(data)==='number'){
        let dataWithNewPage = this.state.filterData
        dataWithNewPage['page'] = data
        this.setState({
          page: data,
          filterData: dataWithNewPage
        })
      } else {
        this.setState({ filterData: this.buildDataToSend(data) })
      }
    }

    fetch("http://localhost:5000/recipes/filter",
          { method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.filterData)
          })
      .then(HandleErrors)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          items: this.state.items.concat(result.recipes),
          newRecipesReady: true,
          pageCount: result.pageCount
        });
      })
      .catch(error => this.setState({ isLoaded: true, error: error }))
  }

  buildDataToSend(data) {
    let newData = { page: 1 }
    const valuesArray =
      [
        'title',
        'time_consuming_from',
        'time_consuming_to',
        'calories_from',
        'calories_to',
        'complexity'
      ]
    for(let key of valuesArray){
      if(data[key] && data[key].value)
        newData[key] = data[key].value
    }
    return newData;
  }

  componentDidMount() {
    this.filterResults()
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    let scrollTop = document.documentElement.scrollTop
    let targetOffsetTop = document.getElementById('js-mark-bottom').offsetTop
    if(targetOffsetTop - scrollTop - window.innerHeight < 500 && this.state.newRecipesReady){
      this.setState({ page: this.state.page + 1})
      this.filterResults(this.state.page);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.filterResults(event.target.elements)
  }

  render(){
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className='search'>
          <div className='search--filters'>
            <form className="form" onSubmit={this.handleSubmit}>
                <input
                    className="form--item"
                    placeholder="Search string ..."
                    name="title"
                    type="text"
                />
                <label className="form--label" htmlFor='time_consuming_from'>
                  Time consuming
                </label>
                <div className="form--field -range">
                  <input
                      className="form--item"
                      placeholder="from.."
                      name="time_consuming_from"
                      type="text"
                  />
                  <span><FontAwesomeIcon icon={faAngleLeft} /></span>
                  <input
                      className="form--item"
                      placeholder="to.."
                      name="time_consuming_to"
                      type="text"
                  />
                </div>
                <label className="form--label" htmlFor='time_consuming_from'>
                  Calories
                </label>
                <div className="form--field -range">
                  <input
                      className="form--item"
                      placeholder="from.."
                      name="calories_from"
                      type="text"
                  />
                  <span><FontAwesomeIcon icon={faAngleLeft} /></span>
                  <input
                      className="form--item"
                      placeholder="to.."
                      name="calories_to"
                      type="text"
                  />
                </div>
                <label className="form--label" htmlFor='time_consuming_from'>
                  Complexity
                </label>
                <div className="form--field -radio-set">
                  <input
                      id="complexityHard"
                      name="complexity"
                      value='hard'
                      type="radio"
                  />
                  <label htmlFor="complexityHard">Hard</label>
                  <input
                      id="complexityNormal"
                      name="complexity"
                      value='normal'
                      type="radio"
                  />
                  <label htmlFor="complexityNormal">Normal</label>
                  <input
                      id="complexityEasy"
                      name="complexity"
                      value='easy'
                      type="radio"
                  />
                  <label htmlFor="complexityEasy">Easy</label>
                  <input
                      id="complexityNoMater"
                      name="complexity"
                      value=''
                      type="radio"
                  />
                  <label htmlFor="complexityNoMater">No matter</label>
                </div>
                <input
                    className="form--submit"
                    value="Filter"
                    type="submit"
                />
            </form>
          </div>
          <div className='search--recipes'>
            {items.map((object, i) => <RecipePreview key={i} item={object} />)}
            <div id='js-mark-bottom'></div>
          </div>
        </div>
      );
    }
  }
}
export default pageWrapper(Search, true);
