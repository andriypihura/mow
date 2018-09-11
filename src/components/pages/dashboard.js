import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ViewListIcon from '@material-ui/icons/ViewList';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BarChartIcon from '@material-ui/icons/BarChart';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Donut from './../../images/donut.svg';
import defaultImage from './../../images/no-image.png';
import './../../css/dashboard.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

const drawerWidth = 240;

const styles = theme => ({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
});

class Dashboard extends Component {
  onLinkClick(e) {
    this.props.changePage(
      e.currentTarget.dataset.title
    );
  }

  render() {
    const { classes, pageTitle } = this.props;
    const user_avatar = sessionStorage.getItem('user_avatar');

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes.appBarShift, 'dashboard--header')}
          >
            <Toolbar className={classes.toolbar}>
              <Typography variant="title" color="inherit" noWrap className={classes.title}>
                {pageTitle}
              </Typography>
              <IconButton
                color="inherit"
                onClick={this.onLinkClick.bind(this)}
                component={Link}
                data-title='Profile'
                to='/profile'>
                <Avatar src={user_avatar || defaultImage}/>
              </IconButton>
              <IconButton
                onClick={this.onLinkClick.bind(this)}
                component={Link}
                data-title='Logout'
                to='/logout'>
                <ExitToAppIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper),
            }}
            open={true}
          >
            <Link
              to='/'
              onClick={this.onLinkClick.bind(this)}
              className='dashboard--logo'
              data-title='Home'>
              <img src={Donut} data-title="Donut" />
              Menu on web
            </Link>
            <List>
              <div>
                <ListItem
                  button
                  onClick={this.onLinkClick.bind(this)}
                  component={Link}
                  data-title='Menus' to='/menus'>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Menus" />
                </ListItem>
                <ListItem
                  button
                  onClick={this.onLinkClick.bind(this)}
                  component={Link}
                  data-title='Own recipes'
                  to='/own-recipes'>
                  <ListItemIcon>
                    <ViewListIcon />
                  </ListItemIcon>
                  <ListItemText primary="Own recipes" />
                </ListItem>
                <ListItem
                  button
                  onClick={this.onLinkClick.bind(this)}
                  component={Link}
                  data-title='Favorites'
                  to='/favorites'>
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Favorites" />
                </ListItem>
                <ListItem
                  button
                  onClick={this.onLinkClick.bind(this)}
                  component={Link}
                  data-title='New recipe'
                  to='/create-recipe'>
                  <ListItemIcon>
                    <NoteAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add recipe" />
                </ListItem>
                <ListItem
                  button
                  onClick={this.onLinkClick.bind(this)}
                  component={Link}
                  data-title='Profile'
                  to='/profile'>
                  <ListItemIcon>
                    <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem
                  button
                  onClick={this.onLinkClick.bind(this)}
                  component={Link}
                  data-title='Search'
                  to='/search'>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Search" />
                </ListItem>
                <ListItem
                  button
                  onClick={this.onLinkClick.bind(this)}
                  component={Link}
                  data-title='Logout'
                  to='/logout'>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </div>
            </List>
          </Drawer>
          <main className={classes.content}>
            <Scrollbars universal>
              <div className='app--body'>
                {this.props.children}
              </div>
            </Scrollbars>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.array,
  changePage: PropTypes.func,
  pageTitle: PropTypes.string
};

const mapStateToProps = state => {
  return {
    pageTitle: state.page
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    changePage: actions.changePage
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));
