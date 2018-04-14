import React, { Component } from 'react';
import { pageWrapper } from './page.js'
import { Redirect } from 'react-router-dom';
import './../../css/profile.css';
import './../../css/label.css';
import DefaultImage from './../../images/no-image.png';
import Loader from './../atoms/loader.js';
import HandleErrors from './../helpers/error-handler.js';

class Profile extends Component{

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: {}
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_APIURL}/checkauth`,
          { headers: {
              "Authorization": `Beablabla ${localStorage.getItem('token')}`
            }
          })
      .then(HandleErrors)
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          item: result.user
        });
      })
      .catch(error => this.setState({ isLoaded: true, error: error }))
  }

  render(){

    const { error, isLoaded, item } = this.state;
    if (error) {
      return <Redirect to={`/error/${error.code}/${error.message}`} />;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      const profileImage = {
        backgroundImage: `url(${item.image || DefaultImage})`
      };

      return (
        <div className='recipe'>
          <div className='recipe--inner'>
            <div className='recipe--inner-col -bigger'>
              <div className='recipe--header' style={profileImage}>
                <div className='recipe--header-info'>
                  <div className='recipe--header-info-title'>
                    {item.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default pageWrapper(Profile);
