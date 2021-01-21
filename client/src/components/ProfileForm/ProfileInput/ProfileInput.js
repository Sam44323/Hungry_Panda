import './ProfileInput.css';

const ProfileInput = (props) => {
  return (
    <div className='profileInputSection'>
      <label htmlFor={props.name} className='profileInputLabel'>
        {props.name}
      </label>
      <input
        type={props.type}
        value={props.value}
        name={props.name}
        onChange={(event) => props.changeAction(props.id, event.target.value)}
        className='profileInputTag'
      />
      {!props.isValid && props.isTouched ? (
        <p className='messageSection'>{props.message}</p>
      ) : null}
    </div>
  );
};

export default ProfileInput;
