import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

/*
Logout will be a form with a button for posting a post request with the hidden input value of the user id
we'll fix it later
*/

class Navigation extends React.Component {
  state = {
    backdrop: false,
    showmenu: false,
  };

  openBackdrop = () => {
    this.setState({ backdrop: true, showmenu: true });
  };

  closeBackdrop = () => {
    this.setState({ backdrop: false, showmenu: false });
  };

  render() {
    let backD = <div className='backdrop' onClick={this.closeBackdrop}></div>;
    if (!this.state.backdrop) {
      backD = null;
    }
    let menu = (
      <div className='navigationListMobile'>
        <ul className='navLinksMobile'>
          <li className='navLinksMobileContainer'>
            <NavLink to='/add-recipes' className='navLinks'>
              Add Recipes
            </NavLink>
          </li>
          <li className='navLinksMobileContainer'>
            <NavLink to='/explore' className='navLinks'>
              Explore Recipes
            </NavLink>
          </li>
          <li className='navLinksMobileContainer'>
            <NavLink to='/profile' className='navLinks'>
              My Profile
            </NavLink>
          </li>
          <li className='navLinksMobileContainer'>
            <NavLink to='/logout' className='navLinks'>
              Logout
            </NavLink>
          </li>
          <li className='navLinksMobileContainer'>
            <NavLink to='/signup' className='navLinks'>
              Sign Up
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
          <button className='hamburgerSection' onClick={this.openBackdrop}>
            <span className='hamburgerLine'></span>
            <span className='hamburgerLine'></span>
            <span className='hamburgerLine'></span>
          </button>
          <div className='appLogoSection'>
            <a href='/' className='appLogo'>
              H
            </a>
          </div>
          <ul className='navigationList'>
            <li className='navlinksContainer'>
              <NavLink to='/add-recipes' className='navLinks'>
                Add Recipes
              </NavLink>
            </li>
            <li className='navlinksContainer'>
              <NavLink to='/explore' className='navLinks'>
                Explore Recipes
              </NavLink>
            </li>
            <li className='navlinksContainer'>
              <NavLink to='/profile' className='navLinks'>
                My Profile
              </NavLink>
            </li>
            <li className='navlinksContainer'>
              <NavLink to='/logout' className='navLinks'>
                Logout
              </NavLink>
            </li>

            <li className='navlinksContainer'>
              <NavLink to='/signup' className='navLinks'>
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Navigation;
