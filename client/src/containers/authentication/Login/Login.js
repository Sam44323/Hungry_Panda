import React, { PureComponent } from 'react';

import sharedStyles from '../../shared/sharedStyles/styles.module.css';
import Navigation from '../../../components/navigation/Navigation';
import Loader from 'react-loader-spinner';
import Input from '../../../components/ProfileForm/ProfileInput/ProfileInput';

class Login extends PureComponent {
  state = {
    loading: false,
    email: {
      value: '',
      touched: false,
      isValid: false,
    },
    password: {
      value: '',
      touched: false,
      isValid: false,
    },
  };
  render() {
    return (
      <React.Fragment>
        <Navigation />
      </React.Fragment>
    );
  }
}

export default Login;
