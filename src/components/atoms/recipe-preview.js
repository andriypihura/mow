// import './../../css/link.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from './../../images/no-image.png';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 345,
  },
  media: {
    objectFit: 'cover',
  },
  cardActionArea: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  tagsWrapper: {
    display: 'flex',
    marginBottom: '10px',
  },
  tags: {
    marginRight: '10px',
    padding: '2px 5px',
  },
};

class RecipePreview extends Component {
  text_truncate(str, num, max) {
    if(str.length < max) return str;
    return str.slice(0,num) + ' ...';
  }

  render(){
    const { classes } = this.props;
    const { id, title, complexity, calories, image, time_consuming, ingredients } = this.props.item;
    const recipeImage = image || defaultImage;

    return (
      <Card className={classes.card}>
        <CardActionArea className={classes.cardActionArea} component={Link} to={`/recipes/${id}`}>
          <CardMedia
            component="img"
            className={classes.media}
            height="140"
            image={recipeImage}
            title={title}
          />
          <CardContent>
            <div className={classes.tagsWrapper}>
              <Paper className={classes.tags} elevation={1}>
                <Typography component="p">
                  {time_consuming || '<10'} m
                </Typography>
              </Paper>
              <Paper className={classes.tags} elevation={1}>
                <Typography component="p">
                  {complexity || 'easy'}
                </Typography>
              </Paper>
              <Paper className={classes.tags} elevation={1}>
                <Typography component="p">
                  {calories || 0} kkal
                </Typography>
              </Paper>
            </div>
            <Typography gutterBottom variant="headline" component="h2">
              {title}
            </Typography>
            <Typography component="p">
              {ingredients.split(',').join(', ')}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Add to menu
          </Button>
          <Button size="small" color="primary" component={Link} to={`/recipes/${id}`}>
            Read more
          </Button>
        </CardActions>
      </Card>

    );
  }
}

RecipePreview.propTypes = {
  showIngredients: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  item: PropTypes.object
};

export default withStyles(styles)(RecipePreview);
