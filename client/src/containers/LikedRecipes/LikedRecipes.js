import React, { PureComponent } from 'react';

import styles from './LikedRecipes.module.css';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import Navigation from '../../components/navigation/Navigation';

class LikedRecipes extends PureComponent {
  state = {
    loading: true,
    likedRecipesData: [],
    error: null,
  };

  componentDidMount() {
    if (
      !localStorage.getItem('token') ||
      new Date(localStorage.getItem('expiresIn')) < new Date()
    ) {
      return this.props.history.replace('/auth/login');
    }
    axios({
      method: 'GET',
      url: 'http://localhost:5000/hungrypandaAPI/users/getLikedRecipes',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        this.setState({
          likedRecipesData: response.data.user.likedRecipes,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          err: 'Please try again later!',
          loading: false,
        });
      });
  }

  render() {
    console.log(this.state.likedRecipesData);
    const LikedRecipes = this.state.likedRecipesData.map((recipe) => (
      <div className={styles.likedRecipesCard} key={recipe._id}>
        <h1>{recipe.name}</h1>
        <h3>{recipe.description}</h3>
      </div>
    ));
    return (
      <React.Fragment>
        {/* <Navigation /> */}
        {this.state.loading && (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Loader type='Puff' color='#493323' height={100} width={100} />
          </div>
        )}
        {LikedRecipes}
      </React.Fragment>
    );
  }
}

export default LikedRecipes;
