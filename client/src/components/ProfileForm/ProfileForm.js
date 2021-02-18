import React, { Component } from 'react';

import styles from './ProfileForm.module.css';
import btnStyles from '../Button/Button.module.css';
import Input from './ProfileInput/ProfileInput';
import FAICON from '../FontAwesome/FontAwesome';
import Button from '../Button/Button';

class ProfileForm extends Component {
  state = {
    userData: {
      name: {
        name: 'Name',
        value: '',
        touched: false,
        isValid: false,
        message: 'Enter a name!',
      },
      email: {
        name: 'Email',
        value: '',
        touched: false,
        isValid: false,
        message: 'Enter a valid email!',
      },
      password: {
        name: 'password',
        value: '',
        touched: false,
        isValid: false,
        message: 'Enter a password!',
      },
      userName: {
        name: 'User name',
        value: '',
        touched: false,
        isValid: false,
        message: 'Enter a User Name!',
      },
      profilePicture: {
        name: 'Profile picture',
        value: '',
        touched: false,
        isValid: false,
        message: 'Enter a picture!',
      },
      age: {
        name: 'Age',
        value: 0,
        touched: false,
        isValid: false,
        message: 'Enter an age!',
      },
      city: {
        name: 'City',
        value: '',
        touched: false,
        isValid: false,
        message: 'Enter a city!',
      },
    },
    socialMedia: {
      fb: {
        name: 'Facebook',
        value: '',
        hasValue: false,
      },
      insta: {
        name: 'Instagram',
        value: '',
        hasValue: false,
      },
      twitter: {
        name: 'Twitter',
        value: '',
        hasValue: false,
      },
    },
  };

  //FOR VALIDATING THE INPUT VALUE

  checkValidity = (name, value) => {
    if (
      name === 'name' ||
      name === 'password' ||
      name === 'userName' ||
      name === 'profilePicture' ||
      name === 'city'
    ) {
      return value === '' ? false : true;
    } else if (name === 'age') {
      return value <= 0 ? false : true;
    } else if (name === 'email') {
      return /.+@.+\.[A-Za-z]+$/.test(value);
    }
  };

  //FOR CHANGING THE VALUE OF THE userData OBJECT

  changeDataValue = (name, value) => {
    const objectData = { ...this.state.userData };
    objectData[name].value = value;
    objectData[name].touched = true;
    objectData[name].isValid = this.checkValidity(name, value);
    this.setState({ userData: objectData });
  };

  // FOR CHANGING THE VALUE OF THE SOCIAL-MEDIA OBJECT

  socialMediaDataChange = (name, value) => {
    const objectData = { ...this.state.socialMedia };
    objectData[name].value = value;
    objectData[name].hasValue =
      objectData[name].value.trim().length > 0 ? true : false;
    this.setState({ socialMedia: objectData });
  };

  submitForm = () => {
    console.log(this.state.userData);
    const data = {
      name: this.state.userData.name.value.trim(),
      email: this.state.userData.email.value.trim(),
      password: this.state.userData.password.value.trim(),
      userName: this.state.userData.userName.value.trim(),
      image: this.state.userData.profilePicture.value.trim(),
      age: this.state.userData.age.value,
      location: this.state.userData.city.value.trim(),
      socialMedia: [
        {
          name: 'Facebook',
          value: this.state.socialMedia.fb.value.trim(),
          hasValue: this.state.socialMedia.fb.hasValue,
        },
        {
          name: 'Instagram',
          value: this.state.socialMedia.insta.value.trim(),
          hasValue: this.state.socialMedia.insta.hasValue,
        },
        {
          name: 'Twitter',
          value: this.state.socialMedia.twitter.value.trim(),
          hasValue: this.state.socialMedia.twitter.hasValue,
        },
      ],
    };
    this.props.submitForm(data);
  };

  render() {
    const dataInput = [];
    for (let keyValue in this.state.userData) {
      const type = keyValue === 'age' ? 'number' : 'text';
      dataInput.push(
        <Input
          key={keyValue}
          id={keyValue}
          type={type}
          name={this.state.userData[keyValue].name}
          value={this.state.userData[keyValue].value}
          changeAction={this.changeDataValue}
          message={this.state.userData[keyValue].message}
          isValid={this.state.userData[keyValue].isValid}
          isTouched={this.state.userData[keyValue].touched}
        />
      );
    }
    const socialMedia = [];
    for (let keyValue in this.state.socialMedia) {
      socialMedia.push(
        <Input
          key={keyValue}
          id={keyValue}
          type='text'
          name={this.state.socialMedia[keyValue].name}
          value={this.state.socialMedia[keyValue].value}
          changeAction={this.socialMediaDataChange}
        />
      );
    }
    let valid = true;
    for (let key in this.state.userData) {
      valid =
        this.state.userData[key].isValid && this.state.userData[key].touched
          ? true
          : false;
    }
    return (
      <div className={styles.profileFormMain}>
        <div className={styles.userDetailsSection}>
          <h1 className={styles.userDataTitle}>
            My Profile <FAICON iconName='faUser' color='brown' />
          </h1>
          {dataInput}
        </div>
        <div className={styles.socialMediaSection}>
          <h1 className={styles.userSocialMediaTitle}>
            Follow me on <FAICON iconName='faHashtag' color='brown' />
          </h1>
          {socialMedia}
        </div>
        <div className={styles.profileBtnSection}>
          <Button
            class={`${btnStyles.ingsBtn} ${btnStyles.SuccessBtn}`}
            clickAction={this.submitForm}
            disabledValue={!valid}
          >
            Add
          </Button>
        </div>
      </div>
    );
  }
}

export default ProfileForm;
