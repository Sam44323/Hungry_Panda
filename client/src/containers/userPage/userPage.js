import React, { Component } from 'react';

import './userPage.css';
import '../shared/sharedStyles/styles.css';
import Navigation from '../../components/navigation/Navigation';
import RecipesCard from '../../components/recipesCardView/recipesCard';

class UserPage extends Component {
  state = {
    recipes: [],
    loading: true,
  };
  render() {
    const recipesCard = this.state.recipes.map((recipe) => (
      <RecipesCard
        key={recipe.id}
        id={recipe.id}
        name={recipe.recipeName}
        cooktime={recipe.cookingTime}
        imageUrl={recipe.recipeImage}
        keyIngrd={recipe.keyIngred}
        kIngredLength={recipe.keyIngred.length}
        desc={recipe.recipeDescription}
        loves={recipe.loves}
        creator={recipe.creator}
      />
    ));
    return (
      <React.Fragment>
        <Navigation />
        {this.state.recipes.length === 0 ? (
          <h1 className='errorTitle'>You don't have any recipes yet!</h1>
        ) : (
          <div className='recipesCardSection'>{recipesCard}</div>
        )}
      </React.Fragment>
    );
  }
}

export default UserPage;
