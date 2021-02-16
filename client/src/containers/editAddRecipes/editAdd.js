import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import styles from './editAdd.module.css';

import Navigation from '../../components/navigation/Navigation';
import Form from '../../components/Form/Form';
import formErrorHandlerHOC from '../../HOC/formErrorHandlerHOC';
import axios from '../../axios-instance';

const EditAdd = () => {
  return (
    <Fragment>
      <Navigation />
      <h1 className={styles.sectionTitle}>
        Your Recipe{' '}
        <FontAwesomeIcon icon={faPencilAlt} style={{ color: 'brown' }} />
      </h1>
      <Form />
    </Fragment>
  );
};

export default formErrorHandlerHOC(EditAdd, axios);
