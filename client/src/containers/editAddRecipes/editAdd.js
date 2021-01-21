import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './editAdd.css';

import Navigation from '../../components/navigation/Navigation';
import Form from '../../components/Form/Form';

const EditAdd = () => {
  return (
    <Fragment>
      <Navigation />
      <h1 className='sectionTitle'>
        Your Recipe{' '}
        <FontAwesomeIcon icon={faPencilAlt} style={{ color: 'brown' }} />
      </h1>
      <Form />
    </Fragment>
  );
};

export default EditAdd;
