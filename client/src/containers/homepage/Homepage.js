import React from 'react';

import './Homepage.css';
import Navigation from '../../components/navigation/Navigation';

const Homepage = () => {
  return (
    <React.Fragment>
      <div className='homepageHeader'>
        <Navigation />
      </div>
      <div className='homepageMain'>
        <div className='homepageTitle'>
          <h1>title</h1>
        </div>
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