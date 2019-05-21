import React, { Component } from 'react';
import { pageWrapper } from './page.js';
import { Redirect } from 'react-router-dom';
import Loader from './../atoms/loader.js';
import './../css/menus.css';
import MenuPreview from './../atoms/menu-preview.js';
import HandleErrors from './../helpers/error-handler.js';
import config from './../config.js';

class Menus extends Component{

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      menus: [],
      createMod: false
    };
    this.openCreateMod = this.openCreateMod.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  openCreateMod() {
    this.setState({
      createMod: true
    });
  }

  handleCreate() {
    fetch(`${config.REACT_APP_APIURL}/users/${sessionStorage.getItem('user')}/menus`,
      { method: 'post',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'title': this.title.value })
      })
      .then(HandleErrors)
      .then(res => res.json())
      .then((response) => {
        this.setState({
          createMod: false,
          menus: this.state.menus + response.menu
        });
      })
      .catch(error => this.setState({ isLoaded: true, error: error }));
  }

  onDelete(menu_id) {
    fetch(`${config.REACT_APP_APIURL}/users/${sessionStorage.getItem('user')}/menus/${menu_id}`,
      { method: 'delete',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(HandleErrors)
      .then(res => res.json())
      .then(() => {
        this.setState({
          menus: this.state.menus.filter(m => m.id !== menu_id)
        });
      })
      .catch(error => this.setState({ isLoaded: true, error: error }));
  }

  componentDidMount() {
    fetch(`${config.REACT_APP_APIURL}/users/${sessionStorage.getItem('user')}/menus`,
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
          menus: response.menus
        });
      })
      .catch(error => this.setState({ isLoaded: true, error: error }));
  }

  render(){
    const { error, isLoaded, menus, createMod } = this.state;
    if (error) {
      return <Redirect to={`/error/${error.code}/${error.message}`} />;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className='menus'>
          {menus.map((object) => <MenuPreview key={object.id} item={object} onDelete={this.onDelete.bind(this)} />)}
          <div className='menu-preview -empty'>
            {!createMod && <span onClick={this.openCreateMod}>+</span>}
            {createMod &&
              <form className="form" onSubmit={this.handleCreate}>
                <input
                  className="form--item"
                  placeholder="Manu title goes here..."
                  name="title"
                  ref={(r) => this.title = r}
                  type="text"
                />
                <input
                  className="form--submit"
                  value="SUBMIT"
                  type="submit"
                />
              </form>}
          </div>
        </div>
      );
    }
  }
}
export default pageWrapper(Menus);
