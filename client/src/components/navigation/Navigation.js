import React from 'react';

import './Navigation.css';
import NavigationLink from './NavigationLink/NavigationLink';
import PandaLogo from '../../assets/images/panda.svg';
import FAICON from '../FontAwesome/FontAwesome';
import * as constants from '../Constants/uiconstants';

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

  //for opening the backdrop and the sidebar
  openBackdrop = () => {
    this.setState({ backdrop: true, showmenu: true, showMenuButton: true });
  };

  //for closing the backdrop and the sidebar
  closeBackdrop = () => {
    this.setState({ backdrop: false, showmenu: false });
  };

  changeElementStyle = (color, shadow, height, width) => {
    let element = document.querySelector('.navigation');
    let appLogo = document.querySelector('.appLogoSection');
    element.style.backgroundColor = color;
    element.style.boxShadow = shadow;
    appLogo.style.height = height;
    appLogo.style.width = width;
  };

  componentDidMount() {
    //for editing the size and the visibility of the navigation items according the scrolling position of the user
    this.scrollBackground = document.addEventListener('scroll', (e) => {
      let scrolled = document.scrollingElement.scrollTop;

      if (scrolled >= 70) {
        this.changeElementStyle('transparent', 'none', '40px', '40px');
      } else {
        this.changeElementStyle(
          '#faebd7',
          '0px 0px 11px 0px rgba(0, 0, 0, 0.76)',
          '70px',
          '70px'
        );
      }
    });
  }

  createNavLink = (classname, destinationName, linkname, iconName) => {
    return (
      <NavigationLink
        listClass={classname}
        destination={destinationName}
        classValue='navLinks'
      >
        <FAICON iconName={iconName} color='brown' /> {linkname}
      </NavigationLink>
    );
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
      <div className='navigationListMobile' onClick={this.closeBackdrop}>
        <ul className='navLinksMobileList'>
          {this.createNavLink(
            constants.MOBILE_CLASS,
            '/add-recipes',
            'Add',
            constants.FAPLUS
          )}
          {this.createNavLink(
            constants.MOBILE_CLASS,
            '/explore',
            'Explore',
            constants.FACOMPASS
          )}
          {this.createNavLink(
            constants.MOBILE_CLASS,
            '/profile',
            'My Profile',
            constants.FAUSERCIRCLE
          )}
          {this.createNavLink(
            constants.MOBILE_CLASS,
            '/logout',
            'Logout',
            constants.FASIGNALTOUT
          )}
          {this.createNavLink(
            constants.MOBILE_CLASS,
            '/auth/signup',
            'Sign Up',
            constants.FAUSERPLUS
          )}
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
            {this.createNavLink(
              constants.DESKTOP_CLASS,
              '/add-recipes',
              'Add',
              constants.FAPLUS
            )}
            {this.createNavLink(
              constants.DESKTOP_CLASS,
              '/explore',
              'Explore',
              constants.FACOMPASS
            )}
            {this.createNavLink(
              constants.DESKTOP_CLASS,
              '/profile',
              'My Profile',
              constants.FAUSERCIRCLE
            )}
            {this.createNavLink(
              constants.DESKTOP_CLASS,
              '/logout',
              'Logout',
              constants.FASIGNALTOUT
            )}
            {this.createNavLink(
              constants.DESKTOP_CLASS,
              '/auth/signup',
              'Sign Up',
              constants.FAUSERPLUS
            )}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
export default Navigation;
