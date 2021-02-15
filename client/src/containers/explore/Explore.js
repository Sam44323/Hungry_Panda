import React from 'react';

import './Explore.css';
import '../shared/sharedStyles/styles.css';

import Navigation from '../../components/navigation/Navigation';
import RecipesCard from '../../components/recipesCardView/recipesCard';
import axios from '../../axios-instance';
import Loader from 'react-loader-spinner';
import errorHandlerHOC from '../../HOC/errorHandlerHOC/errorHandlerHOC';

class Explore extends React.Component {
  state = {
    recipes: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get('hungrypandaAPI/recipes/explore')
      .then((recipes) => {
        this.setState({ recipes: recipes.data.recipes, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  }

  render() {
    const recipesCard = this.state.recipes.map((recipe) => {
      return (
        <RecipesCard
          key={recipe._id}
          id={recipe.id}
          name={recipe.name}
          cooktime={recipe.cookTime}
          imageUrl={recipe.image}
          keyIngrd={recipe.keyIngred}
          showRecipeDetails={() =>
            this.props.history.push(`/recipeDetails/${recipe._id}`)
          }
          kIngredLength={recipe.keyIngred.length}
          desc={recipe.description}
          loves={recipe.likes}
          creator={recipe.creator}
        />
      );
    });
    return (
      <React.Fragment>
        <Navigation />
        {this.state.loading ? (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Loader type='Puff' color='#493323' height={100} width={100} />
          </div>
        ) : (
          <div className='recipesCardSection'>{recipesCard}</div>
        )}
      </React.Fragment>
    );
  }
}

export default errorHandlerHOC(Explore, axios);
