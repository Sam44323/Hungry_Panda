import React from 'react';

import './Homepage.css';
import Navigation from '../../components/navigation/Navigation';

//Will complete this at the end so that we can attach some videos of the app working in real time

const Homepage = () => {
  return (
    <React.Fragment>
      <div className='homepageHeader'>
        <Navigation />
      </div>
      <div className='homepageMain'>
        <h1 className='homepageTitle'>Hungry Panda!</h1>
        <div className='homepageFeatures'>
          <h1>features</h1>
        </div>
        <div className='hompageCTA'>
          <h1>create an account</h1>
        </div>
      </div>
      <div className='footerSection'>
        <h1>footer</h1>
      </div>
    </React.Fragment>
  );
};

export default Homepage;
