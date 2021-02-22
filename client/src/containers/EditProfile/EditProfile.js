import React, { PureComponent } from 'react';

import {
  socialMediaObjectCreator,
  userInputDetailState,
} from '../../components/Constants/utilityFunction/createStateValue';

import sharedStyles from '../shared/sharedStyles/styles.module.css';
import Loader from 'react-loader-spinner';
import Navigation from '../../components/navigation/Navigation';
import axios from 'axios';
import formErrorHandlerHOC from '../../HOC/formErrorHandlerHOC';

class EditProfile extends PureComponent {
  state = {
    loading: false,
    userData: {
      name: {},
      email: {},
      password: {},
      userName: {},
      profilePicture: {},
      age: {},
      city: {},
    },
    socialMedia: {
      fb: {},
      insta: {},
      twitter: {},
    },
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(
        `http://localhost:5000/hungrypandaAPI/users/myprofile/${this.props.match.params.id}`
      )
      .then((user) => {
        if (user) {
          console.log(user);
          this.setState({ loading: false });
        }
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

export default formErrorHandlerHOC(EditProfile);
