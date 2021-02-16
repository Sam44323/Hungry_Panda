import styles from './Input.module.css';

const Input = (props) => {
  let inputValue;
  switch (props.type) {
    case 'textarea':
      inputValue = (
        <div className={styles.inputSection}>
          <label htmlFor={props.name}>{props.name}</label>
          <textarea
            name={props.name}
            value={props.value}
            required={props.required}
            style={{ resize: 'none' }}
            onChange={(event) =>
              props.actionHandler(props.name, props.type, event.target.value)
            }
            rows='3'
            cols='3'
          />
          {props.touched && !props.isValid ? (
            <p className={styles.messageSection}>{props.message}</p>
          ) : null}
        </div>
      );
      break;

    default:
      inputValue = (
        <div
          className={`${styles.inputSection} ${
            props.classValue ? styles[props.classValue] : null
          }`}
        >
          <label htmlFor={props.name}>{props.name}</label>
          <input
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={(event) =>
              props.actionHandler(props.name, props.type, event.target.value)
            }
            required={props.required}
          />
          {props.touched && !props.isValid ? (
            <p className={styles.messageSection}>{props.message}</p>
          ) : null}
        </div>
      );
      break;
  }
  return inputValue;
};

export default Input;
