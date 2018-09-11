import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 345,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  infoLine: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

class MenuPreview extends Component{
  constructor(props) {
    super(props);
    this.state = {
      menu: this.props.item
    };
  }

  render(){
    const { classes } = this.props;
    const { error } = this.state;
    const { id, title, created_at, updated_at } = this.state.menu;
    if (error) {
      return <Redirect to={`/error/${error.code}/${error.message}`} />;
    } else {
      return (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="headline" component="h2">
              {title}
            </Typography>
            <div className={classes.infoLine}>
              <Typography component="p">
                Created at:
              </Typography>
              <Typography component="p">
                <Moment format="DD.MM.YYYY">
                  {created_at}
                </Moment>
              </Typography>
            </div>
            <div className={classes.infoLine}>
              <Typography component="p">
                Updated at:
              </Typography>
              <Typography component="p">
                <Moment format="DD.MM.YYYY">
                  {updated_at}
                </Moment>
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            <Button size="small" component={Link} to={`/menu/${id}`}>
              Open
            </Button>
            <Button
              size="small"
              onClick={() => {if(window.confirm('Are you sure you wish to delete this item?')) this.props.onDelete(id);}}>
              Delete
            </Button>
          </CardActions>
        </Card>
      );
    }
  }
}

MenuPreview.propTypes = {
  item: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onDelete: PropTypes.func
};

export default withStyles(styles)(MenuPreview);
