import React from 'react';

import './Navigation.css';
import NavigationLink from './NavigationLink/NavigationLink';
import PandaLogo from '../../assets/images/panda.svg';
import FAICON from '../FontAwesome/FontAwesome';

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
            <FAICON iconName='faPlus' color='brown' /> Add
          </NavigationLink>

          <NavigationLink
            listClass='navLinksMobileContainer'
            destination='/explore'
            classValue='navLinks'
          >
            <FAICON iconName='faCompass' color='brown' />
            Explore
          </NavigationLink>

          <NavigationLink
            listClass='navLinksMobileContainer'
            destination='/profile'
            classValue='navLinks'
          >
            <FAICON iconName='faUserCircle' color='brown' /> My Profile
          </NavigationLink>

          <NavigationLink
            listClass='navLinksMobileContainer'
            destination='/logout'
            classValue='navLinks'
          >
            <FAICON iconName='faSignOutAlt' color='brown' /> Logout
          </NavigationLink>

          <NavigationLink
            listClass='navLinksMobileContainer'
            destination='/auth/signup'
            classValue='navLinks'
          >
            <FAICON iconName='faUserPlus' color='brown' /> Sign Up
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
              <FAICON iconName='faPlus' color='brown' /> Add
            </NavigationLink>

            <NavigationLink
              listClass='navlinksContainer'
              destination='/explore'
              classValue='navLinks'
            >
              <FAICON iconName='faCompass' color='brown' /> Explore
            </NavigationLink>

            <NavigationLink
              listClass='navlinksContainer'
              destination='/profile'
              classValue='navLinks'
            >
              <FAICON iconName='faUserCircle' color='brown' /> My Profile
            </NavigationLink>

            <NavigationLink
              listClass='navlinksContainer'
              destination='/logout'
              classValue='navLinks'
            >
              <FAICON iconName='faSignOutAlt' color='brown' /> Logout
            </NavigationLink>

            <NavigationLink
              listClass='navlinksContainer'
              destination='/auth/signup'
              classValue='navLinks'
            >
              <FAICON iconName='faUserPlus' color='brown' /> Sign Up
            </NavigationLink>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Navigation;
