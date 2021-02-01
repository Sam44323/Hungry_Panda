import React, { Component } from 'react';

import './Form.css';
import Input from './InputFields/Input';
import Button from '../Button/Button';
import Ingredients from '../IngredientsTODO/Ingredients';
import FAICON from '../FontAwesome/FontAwesome';
import * as constants from '../Constants/uiconstants';
import axios from '../../axios-instance';
import Loader from 'react-loader-spinner';

let ingConst = 1; // CONST FOR INGREDIENT IDS
class Form extends Component {
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
      message: 'Enter a valid ingredient!',
      isValid: true,
    },
    keyingredients: {
      ing: [],
      message: 'Enter a valid ingredient!',
      isValid: true,
    },
  };

  //FOR DELETING THE INGREDIENT VALUE

  removeIngredients = (type, ingId) => {
    let ings = { ...this.state[type] };
    ings.ing = ings.ing.filter((item) => item.id !== ingId);
    if (type === 'ingredients') {
      this.setState({ ingredients: ings });
    } else {
      this.setState({ keyingredients: ings });
    }
  };

  //FOR CHANGING THE VALUES OF THE INPUTS

  changeValueHandler = (name, type, value) => {
    let valueArray = [];
    if (type === 'number') {
      valueArray = [...this.state.numberFieldName];
      if (name === 'Minutes' && value > 59) {
        alert('Plese enter a valid time');
        return;
      }
    } else {
      valueArray = [...this.state.textFieldName];
    }
    valueArray = valueArray.map((item) => {
      if (item.name === name) {
        item.value = value;
        item.touched = true;
        if ((type === 'text' || type === 'textarea') && value === '') {
          item.isValid = false;
        } else {
          item.isValid = true;
        }
      }
      return item;
    });
    if (type === 'number') {
      this.setState({ numberFieldName: [...valueArray] });
    } else {
      this.setState({ textFieldName: [...valueArray] });
    }
  };

  //FOR CHECKING THE VALIDATION OF THE FORM

  checkFormValidation = () => {
    let c = 0;
    for (let item of this.state.textFieldName) {
      if (item.isValid) {
        c++;
      }
    }
    return c === 4 ? true : false;
  };

  //METHOD FOR SETTING THE INGREDIENTS TO THE INGREDIENTS ARRAY OF THE STATE

  setIngredients = (value, type) => {
    const ingObject = { ...this.state[type] };
    if (value.trim() === '') {
      ingObject.isValid = false;
      this.setState({ ingredients: ingObject });
      return;
    }
    ingObject.ing.push({ id: ingConst++, value: value.trim() });
    ingObject.isValid = true;
    if (type === 'ingredients') {
      this.setState({ ingredients: ingObject });
    } else {
      this.setState({ keyingredients: ingObject });
    }
  };

  resetValue = () => {
    const textField = [...this.state.textFieldName];
    const numberField = [...this.state.numberFieldName];
    for (let item of textField) {
      item.value = '';
      item.isValid = false;
      item.touched = false;
    }
    for (let item of numberField) {
      item.value = 0;
    }
    let resetIngs = {
      ing: [],
      message: 'Enter a valid ingredient!',
      isValid: true,
    };
    this.setState({
      textFieldName: textField,
      numberFieldName: numberField,
      ingredients: resetIngs,
      keyingredients: resetIngs,
    });
  };

  //METHOD FOR SUBMITTNG THE FORM AND ADDING A NEW RECIPE

  submitForm = () => {
    this.setState({ loading: true });
    if (
      (this.state.numberFieldName[0].value === 0 &&
        this.state.numberFieldName[1].value === 0) ||
      this.state.ingredients.ing.length === 0
    ) {
      alert('Please fill all the details');
      return;
    }

    const data = {
      name: this.state.textFieldName[0].value,
      image: this.state.textFieldName[1].value,
      description: this.state.textFieldName[2].value,
      procedure: this.state.textFieldName[3].value,
      cookTime: {
        hours: this.state.numberFieldName[0].value,
        minutes: this.state.numberFieldName[1].value,
      },
      keyIngred: this.state.keyingredients.ing.map((item) => item.value),
      ingredients: this.state.ingredients.ing.map((item) => item.value),
    };
    axios
      .post('/hungrypandaAPI/recipes/addrecipe', data)
      .then((recipeData) => {
        this.setState({ loading: false });
        console.log(recipeData);
        alert('Created the recipe!');
        this.resetValue();
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  returnIngredArray = (type) => {
    return this.state[type].ing.map((item) => (
      <div key={Math.random()} className='ingValueDivision'>
        <h1 className='ingValueStyle'>
          {item.value}{' '}
          <Button
            class='ingsButton'
            clickAction={() => this.removeIngredients(type, item.id)}
          >
            <FAICON iconName={constants.FATIMESCIRCLE} color='black' />
          </Button>
        </h1>
      </div>
    ));
  };

  render() {
    let c = 0;
    //STORING THE INPUTS FOR THE TEXTS
    const textInputs = this.state.textFieldName.map((item) => (
      <Input
        key={++c}
        type={item.type}
        name={item.name}
        required
        value={item.value}
        actionHandler={this.changeValueHandler}
        isValid={item.isValid}
        touched={item.touched}
        message={item.message}
      />
    ));
    //STORING THE INPUTS FOR THE NUMBERS
    const numberInputs = (
      <div className='numberSection'>
        {this.state.numberFieldName.map((item) => (
          <Input
            key={++c}
            type='number'
            name={item.name}
            required
            classValue='numberInput'
            value={item.value}
            actionHandler={this.changeValueHandler}
            isValid={item.isValid}
            touched={item.touched}
            message={item.message}
          />
        ))}
      </div>
    );

    //FOR STORING THE INGREDIENTS IN A STYLED INPUT
    const ingrd = this.returnIngredArray('ingredients');
    const keyIngred = this.returnIngredArray('keyingredients');
    let disabled = !this.checkFormValidation(); //for storing the button disabled information
    return (
      <div className='formSection'>
        {numberInputs}
        {textInputs}
        <div className='ingredientsSection'>
          <h1 className='ingTitle'>Key Ingredients (with values)</h1>
          <Ingredients
            type='keyingredients'
            submitIngredients={this.setIngredients}
            validCondition={this.state.keyingredients.isValid}
            message={this.state.keyingredients.message}
          />
          {keyIngred.length > 0 ? (
            <div className='ingValueSection'>{keyIngred}</div>
          ) : null}
        </div>
        <div className='ingredientsSection'>
          <h1 className='ingTitle'>Ingredients (with values)</h1>
          <Ingredients
            type='ingredients'
            submitIngredients={this.setIngredients}
            validCondition={this.state.ingredients.isValid}
            message={this.state.ingredients.message}
          />
          {ingrd.length > 0 ? (
            <div className='ingValueSection'>{ingrd}</div>
          ) : null}
        </div>
        <div className='formBtnSection'>
          {this.state.loading ? (
            <Loader type='Puff' color='#493323' height={100} width={100} />
          ) : (
            <Button
              class='SuccessBtn'
              clickAction={this.submitForm}
              disabledValue={disabled}
            >
              Add
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default Form;
