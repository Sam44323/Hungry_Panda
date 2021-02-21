import React, { Component } from 'react';

import sharedStyles from '../shared/sharedStyles/styles.module.css';
import axios from 'axios';
import Form from '../../components/Form/Form';
import Navigation from '../../components/navigation/Navigation';
import Loader from 'react-loader-spinner';

class EditRecipes extends Component {
  state = {
    loading: false,
    textFieldName: [],
    numberFieldName: [],
    ingredients: {
      ing: [],
      isValid: true,
    },
    keyingredients: {
      ing: [],
      isValid: true,
    },
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(
        `http://localhost:5000/hungrypandaAPI/recipes/recipe/${this.props.match.params.id}`
      )
      .then((recipe) => {
        this.setState({
          loading: false,
        });
        console.log(recipe);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Navigation />
        {this.state.loading ? (
          <div className={sharedStyles.loadingDivStyles}>
            <Loader type='Puff' color='#493323' height={100} width={100} />
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default EditRecipes;
