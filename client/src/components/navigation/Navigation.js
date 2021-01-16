import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faCompass,
  faUserCircle,
  faSignOutAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

import './Navigation.css';
import PandaLogo from '../../assets/images/panda.svg';

/*
Logout will be a form with a button for posting a post request with the hidden input value of the user id
we'll fix it later
*/

class Navigation extends React.Component {
  state = {
    backdrop: false,
    showmenu: false,
    showMenuButton: true,
  };

  openBackdrop = () => {
    this.setState({ backdrop: true, showmenu: true, showMenuButton: true });
  };

  closeBackdrop = () => {
    this.setState({ backdrop: false, showmenu: false });
  };

  render() {
    let showButtonMenu = null;
    let backD = <div className='backdrop' onClick={this.closeBackdrop}></div>;
    if (!this.state.backdrop) {
      backD = null;
      showButtonMenu = (
        <button className='hamburgerSection' onClick={this.openBackdrop}>
          <span className='hamburgerLine'></span>
          <span className='hamburgerLine'></span>
          <span className='hamburgerLine'></span>
        </button>
      );
    }
    let menu = (
      <div className='navigationListMobile'>
        <ul className='navLinksMobileList'>
          <li className='navLinksMobileContainer'>
            <NavLink
              to='/add-recipes'
              className='navLinks'
              activeStyle={{
                color: 'saddlebrown',
                backgroundColor: 'wheat',
                borderRadius: '10px',
                padding: '10px',
              }}
            >
              <FontAwesomeIcon icon={faPlus} /> Add
            </NavLink>
          </li>
          <li className='navLinksMobileContainer'>
            <NavLink
              to='/explore'
              className='navLinks'
              activeStyle={{
                color: 'saddlebrown',
                backgroundColor: 'wheat',
                borderRadius: '10px',
                padding: '10px',
              }}
            >
              <FontAwesomeIcon icon={faCompass} /> Explore
            </NavLink>
          </li>
          <li className='navLinksMobileContainer'>
            <NavLink
              to='/profile'
              className='navLinks'
              activeStyle={{
                color: 'saddlebrown',
                backgroundColor: 'wheat',
                borderRadius: '10px',
                padding: '10px',
              }}
            >
              <FontAwesomeIcon icon={faUserCircle} /> My Profile
            </NavLink>
          </li>
          <li className='navLinksMobileContainer'>
            <NavLink
              to='/logout'
              className='navLinks'
              activeStyle={{
                color: 'saddlebrown',
                backgroundColor: 'wheat',
                borderRadius: '10px',
                padding: '10px',
              }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </NavLink>
          </li>
          <li className='navLinksMobileContainer'>
            <NavLink
              to='/signup'
              className='navLinks signUpLink'
              activeStyle={{
                color: 'saddlebrown',
                backgroundColor: 'wheat',
                borderRadius: '10px',
                padding: '10px',
              }}
            >
              <FontAwesomeIcon icon={faUserPlus} /> Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    );
    if (!this.state.showmenu) {
      menu = null;
    }

    return (
      <React.Fragment>
        {backD}
        {menu}
        <div className='navigation'>
          <div className='appLogoSection'>
            <a href='/'>
              <img src={PandaLogo} alt='pic of panda' />
            </a>
          </div>
          {showButtonMenu}
          <ul className='navigationList'>
            <li className='navlinksContainer'>
              <NavLink
                to='/add-recipes'
                className='navLinks'
                activeStyle={{
                  color: 'saddlebrown',
                  backgroundColor: 'wheat',
                  borderRadius: '10px',
                }}
              >
                <FontAwesomeIcon icon={faPlus} /> Add
              </NavLink>
            </li>
            <li className='navlinksContainer'>
              <NavLink
                to='/explore'
                className='navLinks'
                activeStyle={{
                  color: 'saddlebrown',
                  backgroundColor: 'wheat',
                  borderRadius: '10px',
                }}
              >
                <FontAwesomeIcon icon={faCompass} /> Explore
              </NavLink>
            </li>
            <li className='navlinksContainer'>
              <NavLink
                to='/profile'
                className='navLinks'
                activeStyle={{
                  color: 'saddlebrown',
                  backgroundColor: 'wheat',
                  borderRadius: '10px',
                }}
              >
                <FontAwesomeIcon icon={faUserCircle} /> My Profile
              </NavLink>
            </li>
            <li className='navlinksContainer'>
              <NavLink
                to='/logout'
                className='navLinks'
                activeStyle={{
                  color: 'saddlebrown',
                  backgroundColor: 'wheat',
                  borderRadius: '10px',
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </NavLink>
            </li>

            <li className='navlinksContainer'>
              <NavLink
                to='/signup'
                className='navLinks signUpLink'
                activeStyle={{
                  color: 'saddlebrown',
                  backgroundColor: 'wheat',
                  borderRadius: '10px',
                }}
              >
                <FontAwesomeIcon icon={faUserPlus} /> Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Navigation;
