import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faPlusCircle } from '@fortawesome/fontawesome-free-solid';
import { faHeart as faHeartRegular } from '@fortawesome/fontawesome-free-regular';
// import './../../css/notification.css';

const NOTIFY_TIMEOUT = 5000;
const NOTIFICATION_TYPE = {
  LIKE: 'like',
  ADD_TO_MENU: 'addToMenu'
};

class Notification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      notification: this.props.notification
    };
  }

  componentDidUpdate(prevProps) {
    if(Object.is(prevProps.notification, this.props.notification)) return;

    clearTimeout(this.state.timerId);

    this.setState({
      notification: this.props.notification,
      timerId: setTimeout(() => this.setState({ notification: null }), NOTIFY_TIMEOUT)
    });
  }

  render(){
    if (!this.state.notification) return (<div></div>);
    const { status, type, value } = this.state.notification;
    const info = {
      icon: null,
      message: null
    };
    switch (type) {
    case NOTIFICATION_TYPE.LIKE:
      [info.icon, info.message] = value
        ? [faHeartSolid, 'You have liked the recipe']
        : [faHeartRegular, 'You have removed your like for the recipe'];
      break;
    case NOTIFICATION_TYPE.ADD_TO_MENU:
      [info.icon, info.message] = [faPlusCircle, 'You have added the recipe to menu'];
      break;
    }
    return (
      <div className={`notification ${status}`}>
        <FontAwesomeIcon icon={info.icon} className='notification--icon'/>
        <div className='notification--text'>{info.message}</div>
      </div>
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.object
};

export default Notification;
