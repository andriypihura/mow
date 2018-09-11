import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loader from './../atoms/loader.js';
import MenuPreview from './../atoms/menu-preview.js';
import HandleErrors from './../helpers/error-handler.js';
import config from './../../config.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 345,
  },
  cardContentEmpty: {
    width: '100%',
    height: '100%',
    fontSize: '70px',
    textAlign: 'center',
    lineHeight: '1.5',
    cursor: 'pointer',
  }
};

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
    this.closeCreateMod = this.closeCreateMod.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  openCreateMod() {
    this.setState({
      createMod: true
    });
  }

  closeCreateMod() {
    this.title = '';
    this.setState({
      createMod: false
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
          menus: this.state.menus.concat([response.menu])
        });
      })
      .catch(error => this.setState({ error }));
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
      .catch(error => this.setState({ error }));
  }

  componentDidMount() {
    console.log('componentDidMount');
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
      .catch(error => this.setState({ error }));
  }

  render(){
    const { classes } = this.props;
    const { error, isLoaded, menus, createMod } = this.state;
    if (error) {
      return <Redirect to={`/error/${error.code}/${error.message}`} />;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className='flex-container'>
          {menus.map((object) => <MenuPreview key={object.id} item={object} onDelete={this.onDelete.bind(this)} />)}
          {createMod &&
            <Card className={classes.card}>
              <CardContent>
                <TextField
                  label="Menu name"
                  id="margin-dense"
                  className={classes.textField}
                  helperText="Come up with a title"
                  inputRef={(r) => this.title = r}
                  name="title"
                  margin="dense"
                />
              </CardContent>
              <CardActions>
                <Button size="small" onClick={this.handleCreate}>
                  Create
                </Button>
                <Button size="small" onClick={this.closeCreateMod}>
                  Cancel
                </Button>
              </CardActions>
            </Card> ||
            <Card className={classes.card}>
              <CardContent
                className={classes.cardContentEmpty}
                onClick={this.openCreateMod}>
                +
              </CardContent>
            </Card>
          }
        </div>
      );
    }
  }
}

Menus.propTypes = {
  showIngredients: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  item: PropTypes.object
};

export default withStyles(styles)(Menus);
