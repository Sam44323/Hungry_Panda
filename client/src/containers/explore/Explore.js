import React from 'react';

import sharedStyles from '../shared/sharedStyles/styles.module.css';

import Navigation from '../../components/navigation/Navigation';

import RecipesCard from '../../components/recipesCardView/recipesCard';
import tokenChecker from '../util/tokenCheckFunction';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import ErrorModal from '../../components/ErrorModal/ErrorModal';

//change the background of the like value based on the token user, for whether the user liked or not

class Explore extends React.Component {
  state = {
    recipes: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    if (tokenChecker()) {
      return this.props.history.replace('/auth/login');
    }
    this.axiosCancelSource = axios.CancelToken.source();
    this.setState({ loading: true });
    axios({
      method: 'GET',
      url: 'http://localhost:5000/hungrypandaAPI/recipes/explore',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((recipes) => {
        if (recipes) {
          for (let recipe of recipes.data.recipes) {
            recipe.image = `http://localhost:5000/${recipe.image}`;
          }
          this.setState({
            recipes: recipes.data.recipes,
            loading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ loading: false, error: 'Network error!' });
        console.log(err);
      });
  }

  likeValueHandler = (recipeId) => {
    axios({
      method: 'PATCH',
      url: `http://localhost:5000/hungrypandaAPI/recipes/updatelike/${recipeId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response) {
          for (let recipe of response.data.recipes) {
            console.log(recipe);
            recipe.image = `http://localhost:5000/${recipe.image}`;
          }
          this.setState({ recipes: response.data.recipes });
        }
      })
      .catch((err) => {
        this.setState({ error: 'Please try again after some time!' });
      });
  };

  render() {
    const recipesCard = this.state.recipes.map((recipe) => {
      return (
        <RecipesCard
          key={recipe._id}
          id={recipe._id}
          name={recipe.name}
          cooktime={recipe.cookTime}
          imageUrl={recipe.image}
          keyIngrd={recipe.keyIngred}
          showRecipeDetails={() =>
            this.props.history.push(`/recipeDetails/${recipe._id}`)
          }
          kIngredLength={recipe.keyIngred.length}
          desc={recipe.description}
          likeValueHandler={this.likeValueHandler}
          loves={recipe.likes}
          creator={recipe.creator}
        />
      );
    });
    return (
      <React.Fragment>
        {this.state.error && (
          <ErrorModal
            handleModal={() => this.setState({ error: null })}
            errorMessage={this.state.error}
          />
        )}
        <Navigation />
        {this.state.loading ? (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Loader type='Puff' color='#493323' height={100} width={100} />
          </div>
        ) : (
          <div className={sharedStyles.recipesCardSection}>{recipesCard}</div>
        )}
        {this.state.recipes.length === 0 && !this.state.loading && (
          <h1
            style={{
              marginTop: '100px',
              textAlign: 'center',
              color: 'saddlebrown',
            }}
          >
            No recipes to show!
          </h1>
        )}
      </React.Fragment>
    );
  }
}

export default Explore;
