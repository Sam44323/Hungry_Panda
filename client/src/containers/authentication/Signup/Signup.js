import React, { PureComponent } from 'react';

import {
  userInputDetailState,
  socialMediaObjectCreator,
} from '../../../components/Constants/utilityFunction/createStateValue';
import sharedStyles from '../../shared/sharedStyles/styles.module.css';
import formErrorHandlerHOC from '../../../HOC/formErrorHandlerHOC';
import Navigation from '../../../components/navigation/Navigation';
import ProfileForm from '../../../components/ProfileForm/ProfileForm';
import axios from 'axios';
import Loader from 'react-loader-spinner';

class Signup extends PureComponent {
  state = {
    loading: false,
    userData: {
      name: userInputDetailState('Name', false, 'Enter a name!'),
      email: userInputDetailState('Email', false, 'Enter a valid email!'),
      password: userInputDetailState('password', false, 'Enter a password!'),
      userName: userInputDetailState('User name', false, 'Enter a User Name!'),
      profilePicture: userInputDetailState(
        'Profile picture',
        false,
        'Enter a picture!'
      ),
      age: userInputDetailState('Age', false, 'Enter an age!', 0),
      city: userInputDetailState('City', false, 'Enter a city!'),
    },
    socialMedia: {
      fb: socialMediaObjectCreator('Facebook'),
      insta: socialMediaObjectCreator('Instagram'),
      twitter: socialMediaObjectCreator('Twitter'),
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
    this.setState({ loading: true });
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
    axios
      .post('http://localhost:5000/hungrypandaAPI/users/signup', data)
      .then((response) => {
        this.setState({ loading: false });
        if (response) {
          this.props.history.push('/myrecipes');
        }
      });
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
          <ProfileForm
            submitForm={this.submitForm}
            userData={this.state.userData}
            socialMedia={this.state.socialMedia}
            changeDataValue={this.changeDataValue}
            socialMediaDataChange={this.socialMediaDataChange}
          />
        )}
      </React.Fragment>
    );
  }
}

export default formErrorHandlerHOC(Signup);
