import React, { Component } from 'react';
import { pageWrapper } from './page.js'
import './../../css/profile.css';
import './../../css/label.css';
import DefaultImage from './../../images/no-image.png';
import Loader from './../atoms/loader.js';

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
    fetch(`http://localhost:5000/checkauth`,
          { headers: {
              "Authorization": `Beablabla ${localStorage.getItem('token')}`
            }
          })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            item: result.user
          });
        },
        (error) => {
          localStorage.removeItem('token')
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render(){

    const { error, isLoaded, item } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
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
