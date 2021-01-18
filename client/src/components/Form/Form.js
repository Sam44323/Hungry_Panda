import React, { Component } from 'react';

import './Form.css';
import Input from './InputFields/Input';
import Button from '../Button/Button';

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
        name: 'Ingredients',
        type: 'textarea',
        value: '',
        touched: false,
        isValid: false,
        message: 'Enter the ingredients for the recipes!',
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
    formIsValid: false,
  };

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

  checkFormValidation = () => {
    let c = 0;
    for (let item of this.state.textFieldName) {
      if (item.isValid) {
        c++;
      }
    }
    return c === 5 ? true : false;
  };

  submitForm = () => {
    if (
      this.state.numberFieldName[0].value === 0 &&
      this.state.numberFieldName[1].value === 0
    ) {
      alert('Enter the cooking time of the recipe');
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
    let disabled = !this.checkFormValidation();
    return (
      <div className='formSection'>
        {numberInputs}
        {textInputs}
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
