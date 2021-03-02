import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import styles from './MyProfile.module.css';
import tokenChecker from '../util/tokenCheckFunction';
import Navigation from '../../components/navigation/Navigation';
import ProfileMain from '../../components/ProfileComponent/ProfileMain';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import axiosMethod from '../util/axiosMethodCreator';

class MyProfile extends Component {
  state = {
    userData: null,
    loading: true,
    error: null,
  };
  componentDidMount() {
    if (tokenChecker()) {
      return this.props.history.replace('/auth/login');
    }
    axios(
      axiosMethod(
        'GET',
        `http://localhost:5000/hungrypandaAPI/users/myprofile/${localStorage.getItem(
          'userId'
        )}`,
        null,
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      )
    )
      .then((user) => {
        if (user) {
          user.data.user.image = `http://localhost:5000/${user.data.user.image}`;
          this.setState({ userData: user.data.user, loading: false });
        }
      })
      .catch((err) => {
        if (err.response) {
          localStorage.clear();
          return this.props.history.replace('/auth/login');
        }
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
              editHandler={() =>
                this.props.history.push(
                  `/edit-profile/${this.state.userData._id}`
                )
              }
              image={this.state.userData.image}
              name={this.state.userData.name}
              email={this.state.userData.email}
              userName={this.state.userData.userName}
              age={this.state.userData.age}
              socialMedia={this.state.userData.socialMedia}
              location={this.state.userData.location}
              likedRecipes={this.state.userData.likedRecipes.length}
              likedRecipesHandler={() =>
                this.props.history.push('/liked-recipes')
              }
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
