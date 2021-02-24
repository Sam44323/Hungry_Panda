import React from 'react';

import styles from '../shared/sharedStyles/styles.module.css';

import Navigation from '../../components/navigation/Navigation';
import RecipesCard from '../../components/recipesCardView/recipesCard';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import ErrorModal from '../../components/ErrorModal/ErrorModal';

class Explore extends React.Component {
  state = {
    recipes: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.axiosCancelSource = axios.CancelToken.source();
    this.setState({ loading: true });
    axios
      .get('http://localhost:5000/hungrypandaAPI/recipes/explore', {
        cancelToken: this.axiosCancelSource.token,
      })
      .then((recipes) => {
        if (recipes) {
          for (let recipe of recipes.data.recipes) {
            console.log(recipe);
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
    axios
      .patch(
        `http://localhost:5000/hungrypandaAPI/recipes/updatelike/${recipeId}`
      )
      .then((response) => {
        if (response) {
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
          <div className={styles.recipesCardSection}>{recipesCard}</div>
        )}
      </React.Fragment>
    );
  }
}

export default Explore;
