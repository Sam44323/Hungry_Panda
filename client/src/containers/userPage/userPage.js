import React, { Component } from 'react';

import './userPage.css';
import '../shared/sharedStyles/styles.css';
import Navigation from '../../components/navigation/Navigation';
import RecipesCard from '../../components/recipesCardView/recipesCard';
import axios from '../../axios-instance';
import Loader from 'react-loader-spinner';
import errorHandlerHOC from '../../HOC/errorHandlerHOC/errorHandlerHOC';

class UserPage extends Component {
  state = {
    recipes: [],
    loading: false,
    hasRecipe: true,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`/hungrypandaAPI/recipes/myrecipes/${'602aa6b101e5f32f94d473c6'}`)
      .then((recipesData) => {
        if (recipesData) {
          this.setState({
            recipes: [...recipesData.data.recipes],
            loading: false,
            hasRecipe: recipesData.data.recipes.length > 0 ? true : false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
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
        loves={recipe.likes}
        creator={recipe.creator}
        showRecipeDetails={() =>
          this.props.history.push(`/recipeDetails/${recipe._id}`)
        }
        deleteRecipe={this.deleteRecipe}
        showDeleteButton
      />
    ));
    return (
      <React.Fragment>
        <Navigation />
        {!this.state.hasRecipe ? (
          <h1 className='errorTitle'>You don't have any recipes yet!</h1>
        ) : (
          <div className='recipesCardSection'>{recipesCard}</div>
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

export default errorHandlerHOC(UserPage, axios);
