import React from 'react';

import styles from './ProfileInput.module.css';

const ProfileInput = (props) => {
  return (
    <div className={styles.profileInputSection}>
      <label htmlFor={props.name} className={styles.profileInputLabel}>
        {props.name}
      </label>
      <input
        type={props.type}
        value={props.value}
        name={props.name}
        onChange={(event) => props.changeAction(props.id, event.target.value)}
        className={styles.profileInputTag}
        autoComplete='off'
      />
      {!props.isValid && props.isTouched ? (
        <p className={styles.messageSection}>{props.message}</p>
      ) : null}
    </div>
  );
};

export default ProfileInput;
