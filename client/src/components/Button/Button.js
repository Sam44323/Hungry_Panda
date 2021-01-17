import './Button.css';

const Button = (props) => {
  return (
    <button className={`btn ${props.class}`} onClick={props.clickAction}>
      {props.children}
    </button>
  );
};

export default Button;
