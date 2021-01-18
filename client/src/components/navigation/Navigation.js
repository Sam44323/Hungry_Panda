import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faCompass,
  faUserCircle,
  faSignOutAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

import './Navigation.css';
import NavigationLink from './NavigationLink/NavigationLink';
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
      if (scrolled >= 70) {
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
          <NavigationLink
            listClass='navLinksMobileContainer'
            destination='/add-recipes'
            classValue='navLinks'
          >
            <FontAwesomeIcon icon={faPlus} /> Add
          </NavigationLink>

          <NavigationLink
            listClass='navLinksMobileContainer'
            destination='/explore'
            classValue='navLinks'
          >
            <FontAwesomeIcon icon={faCompass} /> Explore
          </NavigationLink>

          <NavigationLink
            listClass='navLinksMobileContainer'
            destination='/profile'
            classValue='navLinks'
          >
            <FontAwesomeIcon icon={faUserCircle} /> My Profile
          </NavigationLink>

          <NavigationLink
            listClass='navLinksMobileContainer'
            destination='/logout'
            classValue='navLinks'
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </NavigationLink>

          <NavigationLink
            listClass='navLinksMobileContainer'
            destination='/signup'
            classValue='navLinks'
          >
            <FontAwesomeIcon icon={faUserPlus} /> Sign Up
          </NavigationLink>
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
            <NavigationLink
              listClass='navlinksContainer'
              destination='/add-recipes'
              classValue='navLinks'
            >
              <FontAwesomeIcon icon={faPlus} /> Add
            </NavigationLink>

            <NavigationLink
              listClass='navlinksContainer'
              destination='/explore'
              classValue='navLinks'
            >
              <FontAwesomeIcon icon={faCompass} /> Explore
            </NavigationLink>

            <NavigationLink
              listClass='navlinksContainer'
              destination='/profile'
              classValue='navLinks'
            >
              <FontAwesomeIcon icon={faUserCircle} /> My Profile
            </NavigationLink>

            <NavigationLink
              listClass='navlinksContainer'
              destination='/logout'
              classValue='navLinks'
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </NavigationLink>

            <NavigationLink
              listClass='navlinksContainer'
              destination='/signup'
              classValue='navLinks'
            >
              <FontAwesomeIcon icon={faUserPlus} /> Sign Up
            </NavigationLink>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Navigation;
