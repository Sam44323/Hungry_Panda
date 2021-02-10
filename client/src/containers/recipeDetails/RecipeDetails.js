import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import axios from '../../axios-instance';

import './RecipeDetails.css';
import Navigation from '../../components/navigation/Navigation';
import RecipeDetailsComponent from '../../components/recipesDetailsComponent/RecipeDetailsComponent';

class RecipeDetails extends Component {
  state = {
    recipe: {},
    loading: false,
    hasRecipe: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`/hungrypandaAPI/recipes/recipe/${this.props.match.params.id}`)
      .then((recipe) => {
        this.setState({
          recipe: { ...recipe.data.recipe },
          loading: false,
          hasRecipe: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <Navigation />
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
          {this.state.loading ? (
            <Loader type='Puff' color='#493323' height={100} width={100} />
          ) : this.state.hasRecipe ? (
            <RecipeDetailsComponent recipe={this.state.recipe} />
          ) : null}
        </div>
      </div>
    );
  }
}
export default RecipeDetails;
