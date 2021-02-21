import React, { PureComponent } from 'react';
import uuid from 'react-uuid';

import sharedStyles from '../shared/sharedStyles/styles.module.css';
import formErrorHandlerHOC from '../../HOC/formErrorHandlerHOC';
import Navigation from '../../components/navigation/Navigation';
import Form from '../../components/Form/Form';
import axios from 'axios';
import Loader from 'react-loader-spinner';

class AddRecipes extends PureComponent {
  state = {
    loading: false,
    textFieldName: [
      {
        name: 'Recipe Name',
        dbName: 'name',
        type: 'text',
        value: '',
        touched: false,
        isValid: false,
        message: 'Enter the recipe name!',
      },
      {
        name: 'Image',
        dbName: 'image',
        type: 'text',
        value: '',
        touched: false,
        isValid: false,
        message: 'Enter a recipe image!',
      },
      {
        name: 'Description',
        dbName: 'description',
        type: 'textarea',
        value: '',
        touched: false,
        isValid: false,
        message: 'Give some recipe description!',
      },
      {
        name: 'Procedure',
        dbName: 'procedure',
        type: 'textarea',
        value: '',
        touched: false,
        isValid: false,
        message: 'Enter the procedure!',
      },
    ],
    numberFieldName: [
      {
        name: 'Hours',
        value: 0,
        touched: false,
      },
      {
        name: 'Minutes',
        value: 0,
        touched: false,
      },
    ],
    ingredients: {
      ing: [],
      isValid: true,
    },
    keyingredients: {
      ing: [],
      isValid: true,
    },
  };

  //FOR CHANGING THE VALUE OF THE RECIPE DETAILS
  changeValueHandler = (name, type, value) => {
    let valueArray =
      type === 'number'
        ? [...this.state.numberFieldName]
        : [...this.state.textFieldName];

    valueArray = valueArray.map((item) => {
      if (item.name === name) {
        item.value = value;
        item.touched = true;
        item.isValid =
          (type === 'text' || type === 'textarea') && value === ''
            ? false
            : true;
      }
      return item;
    });
    if (type === 'number') {
      this.setState({ numberFieldName: [...valueArray] });
    } else {
      this.setState({ textFieldName: [...valueArray] });
    }
  };

  //CHECKING THE VALIDATION OF THE FORM
  checkFormValidation = () => {
    let c = 0;
    for (let item of this.state.textFieldName) {
      if (item.isValid) {
        c++;
      }
    }
    return c === 4;
  };

  //ADDING THE INGREDIENTS TO THE RESPECTIVE ARRAYS
  setIngredients = (value, type) => {
    if (value.trim() === '') {
      return;
    }
    const ingObject = { ...this.state[type] };
    ingObject.ing.push({ id: uuid(), value: value.trim() });
    if (type === 'ingredients') {
      this.setState({ ingredients: ingObject });
    } else {
      this.setState({ keyingredients: ingObject });
    }
  };

  //FOR SUBMITTING THE FORM
  submitForm = () => {
    this.setState({ loading: true });
    const data = {
      name: this.state.textFieldName[0].value.trim(),
      image: this.state.textFieldName[1].value.trim(),
      description: this.state.textFieldName[2].value.trim(),
      procedure: this.state.textFieldName[3].value.trim(),
      cookTime: {
        hours: this.state.numberFieldName[0].value,
        minutes: this.state.numberFieldName[1].value,
      },
      keyIngred: this.state.keyingredients.ing.map((item) => item.value.trim()),
      ingredients: this.state.ingredients.ing.map((item) => item.value.trim()),
    };
    axios
      .post('http://localhost:5000/hungrypandaAPI/recipes/addrecipe', data)
      .then((resp) => {
        this.setState({ loading: false });
        if (resp) {
          this.props.history.push('/myrecipes');
        }
      });
  };

  //FOR REMOVING THE INGREDIENTS FROM THE RESPECTIVE ARRAYS
  removeIngredients = (type, ingId) => {
    let ings = { ...this.state[type] };
    ings.ing = ings.ing.filter((item) => item.id !== ingId);
    ings.isValid = ings.ing.length > 0;
    if (type === 'ingredients') {
      this.setState({ ingredients: ings });
    } else {
      this.setState({ keyingredients: ings });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Navigation />
        {this.state.loading ? (
          <div className={sharedStyles.loadingDivStyles}>
            <Loader type='Puff' color='#493323' height={100} width={100} />
          </div>
        ) : (
          <Form
            submitForm={this.submitForm}
            textFieldName={this.state.textFieldName}
            numberFieldName={this.state.numberFieldName}
            ingredients={this.state.ingredients}
            keyingredients={this.state.keyingredients}
            removeIngredients={this.removeIngredients}
            changeValue={this.changeValueHandler}
            checkFormValidation={this.checkFormValidation}
            setIngredients={this.setIngredients}
            submit={this.submitForm}
          />
        )}
      </React.Fragment>
    );
  }
}

export default formErrorHandlerHOC(AddRecipes);
