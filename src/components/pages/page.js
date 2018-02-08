import React from 'react';
import Nav from './../atoms/nav.js';
import Footer from './../atoms/footer.js';
import Loader from './../atoms/loader.js';

export const pageWrapper = (WrappedComponent) => {
  class Wrapper extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        userId: null,
        token: localStorage.getItem('token'),
        isLoaded: true
      }
    }

    componentDidMount() {
      if(this.state.token)
        this.checkauth();
    }

    checkauth() {
      this.setState({
        isLoaded: false
      });

      fetch("http://localhost:5000/checkauth",
            { headers: {
                "Authorization": `Beablabla ${this.state.token}`
              }
            })
        .then(res => res.json())
        .then(
          (result) => {
            if(result.user)
              this.setState({
                userId: result.user.id,
                isLoaded: true
              });
          },
          (error) => {
            console.log(`checkauth: ${error}`);
            localStorage.setItem('token', '')
            this.setState({
              userId: null,
              isLoaded: true
            });
          }
        )
    }

    render() {
      if(this.state.isLoaded){
        return (
          <div className='app--inner'>
            <Nav userId={this.state.userId}/>
            <div className='app--body'>
              <WrappedComponent {...this.props}/>
            </div>
            <Footer />
          </div>
        );
      } else {
        return (
          <div className='app--inner'>
            <div className='app--body'>
              <Loader />
            </div>
          </div>
        );
      }
    }
  }
  return Wrapper;
}
