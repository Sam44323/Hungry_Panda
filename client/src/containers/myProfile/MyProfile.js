import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import styles from './MyProfile.module.css';
import Navigation from '../../components/navigation/Navigation';
import ProfileMain from '../../components/ProfileComponent/ProfileMain';
import ErrorModal from '../../components/ErrorModal/ErrorModal';

class MyProfile extends Component {
  state = {
    userData: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    axios
      .get(
        'http://localhost:5000/hungrypandaAPI/users/myprofile/602aa6b101e5f32f94d473c6'
      )
      .then((user) => {
        this.setState({ userData: user.data.user, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false, error: err.response.data.message });
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.error && (
          <ErrorModal
            handleModal={() => this.setState({ error: null })}
            errorMessage={this.state.error}
          />
        )}
        <Navigation />
        {this.state.loading ? (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Loader type='Puff' color='#493323' height={100} width={100} />
          </div>
        ) : this.state.userData ? (
          <div className={styles.userMainSectionDiv}>
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
        ) : null}
      </React.Fragment>
    );
  }
}

export default MyProfile;
