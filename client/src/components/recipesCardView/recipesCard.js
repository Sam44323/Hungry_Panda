import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock } from '@fortawesome/free-solid-svg-icons';

import './recipesCard.css';
import Button from '../Button/Button';

const RecipesCard = (props) => {
  let c = 0;
  let likedValue = null;
  if (props.loves > 0) {
    likedValue = (
      <Fragment>
        <h3 className='loveTitle'>{props.loves}</h3>
        <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
      </Fragment>
    );
  }
  const ingreds = (
    <ul className='keyIngredContainer'>
      <h3 className='keyIngredTitle'>Key Ingredients</h3>
      <div className='keyIngredItemsSection'>
        {props.keyIngrd.map((item) => {
          ++c;
          return (
            <li key={c} className='keyIngredItem'>
              <h4>
                {item}
                {c === props.kIngredLength ? '.' : ','}
              </h4>
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
    <div className='recipeCard'>
      <div className='recipeImageContainer'>
        <img src={props.imageUrl} alt={props.name} className='recipeImage' />
      </div>
      <div className='mainCardContent'>
        <h3 className='recipeTitle'>{props.name}</h3>
        <p className='cookingTime'>
          <FontAwesomeIcon icon={faClock} /> {timeValue}
          {props.cooktime.mins} minutes
        </p>
        <h3 className='recipeDescription'>{props.desc}</h3>
        {ingreds}
        <div className='actionButtons'>
          <Button
            class='SuccessBtn'
            clickAction={() => alert('Show is working')}
          >
            Show
          </Button>
          <Button
            class='DangerBtn'
            clickAction={() => alert('Delete is working')}
          >
            Delete
          </Button>
        </div>
        <div className='likingContainer'>{likedValue}</div>
      </div>
    </div>
  );
};

export default RecipesCard;
