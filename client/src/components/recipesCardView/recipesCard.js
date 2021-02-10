import { Fragment } from 'react';

import './recipesCard.css';
import Button from '../Button/Button';
import FAICON from '../FontAwesome/FontAwesome';
import { FACLOCK } from '../Constants/uiconstants';

const RecipesCard = (props) => {
  let c = 0;
  let likedValue = (
    <Fragment>
      <h3 className='loveTitle'>{props.loves}</h3>
      <FAICON iconName='faHeart' color='red' />
    </Fragment>
  );
  const ingreds = (
    <ul className='keyIngredContainer'>
      <h3 className='keyIngredTitle'>Key Ingredients</h3>
      <div className='keyIngredItemsSection'>
        {props.keyIngrd.map((item) => {
          ++c;
          return (
            <li key={c} className='keyIngredItem'>
              <h4 className='keyIngredItemHeading'>{item}</h4>
            </li>
          );
        })}
      </div>
    </ul>
  );

  const timeValue =
    props.cooktime.hours > 0
      ? props.cooktime.hours === 1
        ? props.cooktime.hours + ' h '
        : props.cooktime.hours + ' hrs '
      : null;

  return (
    <div className='mainCardContent'>
      <div className='recipeImageContainer'>
        <img src={props.imageUrl} alt={props.name} className='recipeImage' />
      </div>
      <h3 className='recipeTitle'>{props.name}</h3>
      <p className='cookingTime'>
        <FAICON iconName={FACLOCK} color='white' /> {timeValue}{' '}
        {props.cooktime.minutes} minutes
      </p>
      <h3 className='recipeDescription'>{props.desc}</h3>
      {ingreds}
      <div className='actionButtons'>
        <Button
          class='SuccessBtn'
          clickAction={() => props.showRecipeDetails()}
        >
          Show
        </Button>
        {props.showDeleteButton ? (
          <Button
            class='DangerBtn'
            clickAction={() => props.deleteRecipe(props.id)}
          >
            Delete
          </Button>
        ) : null}
      </div>
      <div className='likingContainer'>{likedValue}</div>
    </div>
  );
};

export default RecipesCard;
