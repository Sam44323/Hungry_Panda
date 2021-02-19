import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import axios from '../../axios-instance';

import Navigation from '../../components/navigation/Navigation';
import RecipeDetailsComponent from '../../components/recipesDetailsComponent/RecipeDetailsComponent';
import errorHandlerHOC from '../../HOC/errorHandlerHOC/errorHandlerHOC';

class RecipeDetails extends Component {
  state = {
    recipe: {},
    loading: false,
    hasRecipe: false,
    creatorUsername: '',
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`/hungrypandaAPI/recipes/recipe/${this.props.match.params.id}`)
      .then((recipe) => {
        if (recipe) {
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
      .patch(`hungrypandaAPI/recipes/updatelike/${recipeId}`)
      .then((response) => {
        if (response) {
          const recipeIndex = response.data.recipes.findIndex(
            (recipe) => recipe._id === recipeId
          );
          this.setState({ recipe: response.data.recipes[recipeIndex] });
        }
      });
  };

  render() {
    return (
      <div>
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
export default errorHandlerHOC(RecipeDetails, axios);
