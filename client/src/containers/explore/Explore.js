import React from 'react';

import './Explore.css';
import '../shared/sharedStyles/styles.css';

import Navigation from '../../components/navigation/Navigation';
import RecipesCard from '../../components/recipesCardView/recipesCard';

class Explore extends React.Component {
  state = {
    recipes: [
      {
        id: 1,
        recipeImage:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU4TlH5yfHqF_77nR0kZNWwwVhKH-tm3slhQ&usqp=CAU',
        recipeName: 'burritos',
        recipeDescription: "This is one of the best buritto you'll ever try",
        keyIngred: ['beaf', 'black-beans', 'sour cream', 'taco'],
        cookingTime: {
          hours: 1,
          mins: 14,
        },
        loves: 3,
        creator: 'Sam Henrick',
      },
      {
        id: 2,
        recipeImage:
          'https://spng.subpng.com/20191212/ijj/transparent-fried-chicken-grill-chick5e15adeca336d9.7647389115784790846685.jpg',
        recipeName: 'chicken tikka',
        recipeDescription:
          'The Indian legendary dish that everyone should try!',
        keyIngred: ['yoghurt', 'lemon juice', 'fresh ginger', 'black pepper'],
        cookingTime: {
          hours: 0,
          mins: 45,
        },
        loves: 1,
        creator: 'Max Schwarz',
      },
    ],
  };
  render() {
    const recipesCard = this.state.recipes.map((recipe) => {
      return (
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
      );
    });
    return (
      <React.Fragment>
        <Navigation />
        <div className='recipesCardSection'>{recipesCard}</div>
      </React.Fragment>
    );
  }
}

export default Explore;
