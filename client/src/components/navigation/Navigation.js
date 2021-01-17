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

  componentDidMount() {
    this.scrollBackground = document.addEventListener('scroll', (e) => {
      let scrolled = document.scrollingElement.scrollTop;
      let element = document.querySelector('.navigation');
      let appLogo = document.querySelector('.appLogoSection');
      if (scrolled >= 120) {
        element.style.backgroundColor = 'transparent';
        element.style.boxShadow = 'none';
        appLogo.style.height = '40px';
        appLogo.style.width = '40px';
      } else {
        element.style.backgroundColor = '#faebd7';
        element.style.boxShadow = '0px 0px 11px 0px rgba(0, 0, 0, 0.76)';
        appLogo.style.height = '70px';
        appLogo.style.width = '70px';
      }
    });
  }

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
            <a href='/myrecipes'>
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
