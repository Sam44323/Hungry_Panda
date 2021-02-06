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
      .get('/hungrypandaAPI/users/myprofile/601ed0ba8846ee3bdc8a349b')
      .then((user) => {
        console.log(user);
        this.setState({ userData: user.data.user, loading: false });
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
          <div className='userMainSectionDiv'>
            <ProfileMain
              image={this.state.userData.image}
              name={this.state.userData.name}
              email={this.state.userData.email}
              userName={this.state.userData.userName}
              age={this.state.userData.age}
              socialMedia={this.state.userData.socialMedia}
              location={this.state.userData.location}
              likes={this.state.userData.totalLikes}
              recipes={this.state.userData.totalRecipes}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default MyProfile;
