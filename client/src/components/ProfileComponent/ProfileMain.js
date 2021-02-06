import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

import './ProfileMain.css';
import FAICON from '../FontAwesome/FontAwesome';
import * as constants from '../Constants/uiconstants';

const ProfileMain = (props) => {
  const socialMediaLinks = props.socialMedia.map((item) => {
    const icon =
      item.name === 'Facebook'
        ? faFacebook
        : item.name === 'Instagram'
        ? faInstagram
        : faTwitter;
    if (item.hasValue) {
      return (
        <a href={item.value} key={item.name}>
          <div className='socialMediaSectionDiv'>
            <FontAwesomeIcon icon={icon} />
          </div>
        </a>
      );
    }
    return null;
  });
  return (
    <React.Fragment>
      <div className='userSectionMain'>
        <div className='userImageSection'>
          <img src={props.image} alt={props.name} className='userImage' />
        </div>
        <h1 className='userNameHeading'>{props.userName}</h1>
        <div className='recipesLoveDivSection'>
          <h1 className='recipesLove'>{props.recipes} Recipes</h1>
          <h1 className='recipesLove'>{props.likes} Loves</h1>
        </div>
        <div className='editButtonSection'>
          <button className='userProfileButton'>Edit Profile</button>
        </div>
      </div>
      <div className='userDetailSub'>
        <div className='subSecFirst'>
          <h1 className='nameTag'>{props.name}</h1>
          <div className='ageLocSection'>
            <h1 className='ageLoc'>{props.location},</h1>
            <h1 className='ageLoc'>{props.age}</h1>
          </div>
          <div className='emailTagSection'>
            <a href={`mailto:${props.email}`} className='emailIconsStyle'>
              <FAICON iconName={constants.FAEMAIL} color='white' />
            </a>
            <br />
            Email
          </div>
        </div>
        <div className='socialMediaSectionContainer'>{socialMediaLinks}</div>
      </div>
    </React.Fragment>
  );
};

export default ProfileMain;
