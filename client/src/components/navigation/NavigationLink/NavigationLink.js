import { NavLink } from 'react-router-dom';

import './NavigationLink.css';

const NavigationLink = (props) => {
  return (
    <li className={props.listClass}>
      <NavLink
        to={props.destination}
        className={props.classValue}
        activeStyle={{
          color: 'saddlebrown',
          backgroundColor: 'wheat',
          borderRadius: '10px',
        }}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavigationLink;
