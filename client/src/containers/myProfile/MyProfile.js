import React, { Component } from 'react';
import axios from '../../axios-instance';
import Loader from 'react-loader-spinner';

//<Loader type='Puff' color='#493323' height={100} width={100} />

import './MyProfile.css';
import Navigation from '../../components/navigation/Navigation';
import ProfileMain from '../../components/ProfileComponent/ProfileMain';

class MyProfile extends Component {
  state = {
    userData: null,
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/hungrypandaAPI/users/myprofile/601d6bfc23906d0224e9499d')
      .then((user) => {
        console.log(user);
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Navigation />
        {this.state.loading ? (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Loader type='Puff' color='#493323' height={100} width={100} />
          </div>
        ) : (
          <ProfileMain />
        )}
      </React.Fragment>
    );
  }
}

export default MyProfile;
