import React, { useState } from 'react';

import Navigation from '../../components/navigation/Navigation';
import Form from '../../components/Form/Form';
import axios from 'axios';
import ErrorModal from '../../components/ErrorModal/ErrorModal';

const EditAdd = ({ history }) => {
  const [err, setError] = useState();

  const submitForm = (dataValue) => {
    axios
      .post('http://localhost:5000/hungrypandaAPI/recipes/addrecipe', dataValue)
      .then(() => {
        history.push('/myrecipes');
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <React.Fragment>
      {err ? (
        <ErrorModal
          errorMessage={err}
          handleModal={() => {
            setError(null);
          }}
        />
      ) : null}
      <Navigation />
      <Form submitForm={submitForm} />
    </React.Fragment>
  );
};

export default EditAdd;
