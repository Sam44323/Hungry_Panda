import React, { useState } from 'react';

import Navigation from '../../../components/navigation/Navigation';
import ProfileForm from '../../../components/ProfileForm/ProfileForm';
import axios from 'axios';
import ErrorModal from '../../../components/ErrorModal/ErrorModal';

const Signup = (props) => {
  const [error, setError] = useState();

  const submitForm = (data) => {
    axios
      .post('http://localhost:5000/hungrypandaAPI/users/signup', data)
      .then(() => {
        props.history.push('/myrecipes');
      })
      .catch((err) => {
        return setError(err.response.data.message);
      });
  };

  return (
    <React.Fragment>
      {error ? (
        <ErrorModal
          errorMessage={error}
          handleModal={() => {
            setError(null);
          }}
        />
      ) : null}
      <Navigation />
      <ProfileForm submitForm={submitForm} />
    </React.Fragment>
  );
};

export default Signup;
