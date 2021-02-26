import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';

import Navigation from '../../components/navigation/Navigation';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import RecipeDetailsComponent from '../../components/recipesDetailsComponent/RecipeDetailsComponent';

class RecipeDetails extends Component {
  state = {
    recipe: {},
    loading: false,
    hasRecipe: false,
    creatorUsername: '',
    error: null,
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      new Date(localStorage.getItem('expiresIn')) < new Date() &&
        this.props.history.replace('/auth/login');
    }
    this.setState({ loading: true });
    axios({
      method: 'GET',
      url: `http://localhost:5000/hungrypandaAPI/recipes/recipe/${this.props.match.params.id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((recipe) => {
        if (recipe) {
          recipe.data.recipe.image = `http://localhost:5000/${recipe.data.recipe.image}`;
          this.setState({
            recipe: { ...recipe.data.recipe },
            loading: false,
            hasRecipe: true,
            creatorUsername: recipe.data.recipe.creatorId.userName,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  likeValueHandler = (recipeId) => {
    axios
      .patch(
        `http://localhost:5000/hungrypandaAPI/recipes/updatelike/${recipeId}`
      )
      .then((response) => {
        if (response) {
          const recipeIndex = response.data.recipes.findIndex(
            (recipe) => recipe._id === recipeId
          );
          response.data.recipes[
            recipeIndex
          ].image = `http://localhost:5000/${response.data.recipes[recipeIndex].image}`;
          this.setState({ recipe: response.data.recipes[recipeIndex] });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: 'Please try again after some time!' });
      });
  };

  render() {
    return (
      <div>
        {this.state.error && (
          <ErrorModal
            errorMessage={this.state.error}
            handleModal={() => this.setState({ error: null })}
          />
        )}
        <Navigation />
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
          {this.state.loading ? (
            <Loader type='Puff' color='#493323' height={100} width={100} />
          ) : this.state.hasRecipe ? (
            <RecipeDetailsComponent
              recipe={this.state.recipe}
              userName={this.state.creatorUsername}
              likeValueHandler={this.likeValueHandler}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
export default RecipeDetails;
