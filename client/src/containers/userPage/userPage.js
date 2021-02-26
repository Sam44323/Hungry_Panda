import React, { Component } from 'react';

import userStyles from './userPage.module.css';
import styles from '../shared/sharedStyles/styles.module.css';
import Navigation from '../../components/navigation/Navigation';
import RecipesCard from '../../components/recipesCardView/recipesCard';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import ErrorModal from '../../components/ErrorModal/ErrorModal';

class UserPage extends Component {
  state = {
    recipes: [],
    loading: false,
    hasRecipe: true,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    if (!localStorage.getItem('token')) {
      return this.props.history.replace('/auth/login');
    }
    axios({
      method: 'GET',
      url: `http://localhost:5000/hungrypandaAPI/recipes/myrecipes/${localStorage.getItem(
        'userId'
      )}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((recipesData) => {
        if (recipesData) {
          for (let recipe of recipesData.data.recipes) {
            recipe.image = `http://localhost:5000/${recipe.image}`;
          }
          this.setState({
            recipes: [...recipesData.data.recipes],
            loading: false,
            hasRecipe: recipesData.data.recipes.length > 0 ? true : false,
          });
        } else {
          throw Error('Please try again!');
        }
      })
      .catch((err) => {
        console.dir(err);
        if (err.response) {
          localStorage.clear();
          return this.props.history.replace('/auth/login');
        }
        this.setState({ loading: false, error: 'Please try again later!' });
      });
  }

  deleteRecipe = (id) => {
    const recipesArray = this.state.recipes.filter(
      (recipe) => recipe._id !== id
    );
    this.setState({
      recipes: [...recipesArray],
      hasRecipe: recipesArray.length > 0 ? true : false,
    });
    axios({
      method: 'DELETE',
      url: `http://localhost:5000/hungrypandaAPI/recipes/deleterecipe/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    axios
      .delete(`http://localhost:5000/hungrypandaAPI/recipes/deleterecipe/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const recipesCard = this.state.recipes.map((recipe) => (
      <RecipesCard
        key={recipe._id}
        id={recipe._id}
        name={recipe.name}
        cooktime={recipe.cookTime}
        imageUrl={recipe.image}
        keyIngrd={recipe.keyIngred}
        kIngredLength={recipe.keyIngred.length}
        desc={recipe.description}
        loves={-1}
        creator={recipe.creator}
        //USE QUERY PARAMS FOR SHOWING THE LIKE VALUE ACCORDINGLY THE PAGES
        showRecipeDetails={() =>
          this.props.history.push(`/recipeDetails/${recipe._id}`)
        }
        deleteRecipe={this.deleteRecipe}
        showDeleteButton
        editBtn
      />
    ));
    return (
      <React.Fragment>
        {this.state.error && (
          <ErrorModal
            handleModal={() => this.setState({ error: null })}
            errorMessage={this.state.error}
          />
        )}
        <Navigation />
        {!this.state.hasRecipe ? (
          <h1 className={userStyles.errorTitle}>
            You don't have any recipes yet!
          </h1>
        ) : (
          <div className={styles.recipesCardSection}>{recipesCard}</div>
        )}
        {this.state.loading ? (
          <div style={{ textAlign: 'center' }}>
            <Loader type='Puff' color='#493323' height={100} width={100} />
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default UserPage;
