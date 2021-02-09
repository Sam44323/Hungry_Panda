import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import axios from '../../axios-instance';

import './RecipeDetails.css';
import Navigation from '../../components/navigation/Navigation';

class RecipeDetails extends Component {
  state = {
    recipe: {},
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`/hungrypandaAPI/recipes/recipe/${this.props.match.params.id}`)
      .then((recipe) => {
        this.setState({ recipe: { ...recipe.data.recipe }, loading: false });
        console.log(this.state);
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
        <h1 style={{ marginTop: '100px' }}>
          {this.state.loading ? (
            <Loader type='Puff' color='#493323' height={100} width={100} />
          ) : (
            'This is the component for the details'
          )}
        </h1>
      </div>
    );
  }
}
export default RecipeDetails;
