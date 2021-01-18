import './Button.css';

const Button = (props) => {
  return (
    <button
      className={`btn ${props.class} ${props.disabledValue && 'disableClass'}`}
      onClick={props.clickAction}
      disabled={props.disabledValue}
    >
      {props.children}
    </button>
  );
};

export default Button;
