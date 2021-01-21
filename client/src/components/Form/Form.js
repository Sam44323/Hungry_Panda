import React, { Component } from 'react';

import './Form.css';
import Input from './InputFields/Input';
import Button from '../Button/Button';
import Ingredients from '../IngredientsTODO/Ingredients';
import FAICON from '../FontAwesome/FontAwesome';

let ingConst = 1; // CONST FOR INGREDIENT IDS
class Form extends Component {
  state = {
    textFieldName: [
      {
        name: 'Recipe Name',
        type: 'text',
        value: '',
        touched: false,
        isValid: false,
        message: 'Enter the recipe name!',
      },
      {
        name: 'Image',
        type: 'text',
        value: '',
        touched: false,
        isValid: false,
        message: 'Enter a recipe image!',
      },
      {
        name: 'Description',
        type: 'textarea',
        value: '',
        touched: false,
        isValid: false,
        message: 'Give some recipe description!',
      },
      {
        name: 'Procedure',
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
    formIsValid: false,
  };

  //FOR DELETING THE INGREDIENT VALUE

  removeIngredients = (ingId) => {
    let ings = { ...this.state.ingredients };
    ings.ing = ings.ing.filter((item) => item.id !== ingId);
    this.setState({ ingredients: ings });
  };

  //FOR CHANGING THE VALUES OF THE INPUTS

  changeValueHandler = (name, type, value) => {
    let valueArray = [];
    if (type === 'number') {
      valueArray = [...this.state.numberFieldName];
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

  setIngredients = (value) => {
    const ingObject = { ...this.state.ingredients };
    console.log(typeof value);
    if (value.trim() === '') {
      ingObject.isValid = false;
      this.setState({ ingredients: ingObject });
      return;
    }
    ingObject.ing.push({ id: ingConst++, value: value.trim() });
    ingObject.isValid = true;
    this.setState({ ingredients: ingObject });
  };

  //METHOD FOR SUBMITTNG THE FORM AND ADDING A NEW RECIPE

  submitForm = () => {
    if (
      (this.state.numberFieldName[0].value === 0 &&
        this.state.numberFieldName[1].value === 0) ||
      this.state.ingredients.ing.length === 0
    ) {
      alert('Please fill all the details');
      return;
    }
    alert('Successfully created a new recipe!');
    this.resetValue();
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
    this.setState({
      textFieldName: textField,
      numberFieldName: numberField,
      formIsValid: false,
    });
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
            numberClass='numberClass'
            isValid={item.isValid}
            touched={item.touched}
            message={item.message}
          />
        ))}
      </div>
    );
    //FOR STORING THE INGREDIENTS IN A STYLED INPUT
    const ingrd = this.state.ingredients.ing.map((item) => (
      <div key={Math.random()} className='ingValueDivision'>
        <h1 className='ingValueStyle'>
          {item.value}{' '}
          <Button
            class='ingsButton'
            clickAction={() => this.removeIngredients(item.id)}
          >
            <FAICON iconName='faTimesCircle' color='black' />
          </Button>
        </h1>
      </div>
    ));
    console.log(this.checkFormValidation());
    let disabled = !this.checkFormValidation(); //for storing the button disabled information
    return (
      <div className='formSection'>
        {numberInputs}
        {textInputs}
        <div className='ingredientsSection'>
          <h1 className='ingTitle'>Ingredients</h1>
          <Ingredients
            submitIngredients={this.setIngredients}
            validCondition={this.state.ingredients.isValid}
            message={this.state.ingredients.message}
          />
          {ingrd.length > 0 ? (
            <div className='ingValueSection'>{ingrd}</div>
          ) : null}
        </div>
        <div className='formBtnSection'>
          <Button
            class='SuccessBtn'
            clickAction={this.submitForm}
            disabledValue={disabled}
          >
            Add
          </Button>
        </div>
      </div>
    );
  }
}

export default Form;
