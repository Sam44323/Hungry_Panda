import React from 'react';

import './RecipeDetailsComponent.css';
import { FACLOCK } from '../Constants/uiconstants';
import FAICON from '../FontAwesome/FontAwesome';

const RecipeDetailsComponent = (props) => {
  const keyIngredientsSection = props.recipe.keyIngred.map((kIng) => (
    <h1 key={kIng} className='recipeDetailsKeyIngredItem'>
      {kIng}
    </h1>
  ));

  const ingredientsDetailsSection = props.recipe.ingredients.map((ingr) => (
    <h1 key={ingr} className='recipeDetailsIngredItem'>
      {ingr}
    </h1>
  ));

  const cookTime = {
    hours:
      props.recipe.cookTime.hours > 0
        ? props.recipe.cookTime.hours === 1
          ? `${props.recipe.cookTime.hours} hour`
          : `${props.recipe.cookTime.hours} hours`
        : null,
    minutes: `${props.recipe.cookTime.minutes} minutes`,
  };

  return (
    <div className='recipeDetailsSection'>
      <img
        src={props.recipe.image}
        alt={props.recipe.name}
        className='recipeDetailsImage'
      />
      <h1 className='recipeDetailsUserName'>
        <span style={{ color: 'saddlebrown' }}>Creator |</span>{' '}
        {props.recipe.creatorId.userName}
      </h1>
      <div className='recipeDetailsMain'>
        <h1 className='recipeDetailsName'>{props.recipe.name}</h1>
        <h4 className='recipeDetailsDescription'>{props.recipe.description}</h4>
        <h3 className='recipeDetailsCooktime'>
          <FAICON iconName={FACLOCK} color='brown' /> {cookTime.hours}{' '}
          {cookTime.minutes}
        </h3>
      </div>
      {props.recipe.likes ? <h1>Liked By: {props.recipe.likes}</h1> : null}
      <div className='keyIngredientsDetailsSection'>
        <h1 className='recipeDetailsKIngredTitle'>Key Ingredients</h1>
        {keyIngredientsSection}
      </div>
      <div className='ingredientsDetailsSection'>
        <h1 className='recipeDetailsIngredientsTitle'>Ingredients</h1>
        {ingredientsDetailsSection}
      </div>
      <div className='recipeDetailsProcedure'>
        <h1 className='recipeDetailsProcedureTitle'>Procedure</h1>
        <p className='recipeDetailProcedureParagraph'>
          {props.recipe.procedure}
        </p>
      </div>
    </div>
  );
};

export default RecipeDetailsComponent;
