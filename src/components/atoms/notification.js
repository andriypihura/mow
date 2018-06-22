import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid, faPlus, faPlusCircle } from '@fortawesome/fontawesome-free-solid'
import { faHeart as faHeartRegular } from '@fortawesome/fontawesome-free-regular'
import './../../css/notification.css';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      notification: this.props.notification
    }
  }

  componentWillReceiveProps(nextProps) {
    if(Object.is(this.props.notification, nextProps.notification))
      return
    clearTimeout(this.state.timerId)
    this.setState({
      notification: nextProps.notification,
      timerId: setTimeout(() => this.setState({ notification: null }), 5000)
    })
  }

  render(){
    if(this.state.notification){
      let { status, type, value } = this.state.notification
      let info = {
        icon: null,
        message: null
      }
      switch (type) {
        case 'like':
          info.icon = value ? faHeartSolid : faHeartRegular
          info.message = value ? 'You have liked the recipe' : 'You have removed your like for the recipe'
          break;
        case 'addToMenu':
          info.icon = faPlusCircle
          info.message = 'You have added the recipe to menu'
          break;
      }
      return (
        <div className={`notification ${status}`}>
          <FontAwesomeIcon icon={info.icon} className='notification--icon'/>
          <div className='notification--text'>{info.message}</div>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }
}
export default Notification;
