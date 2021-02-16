import React from 'react';

import styles from './Homepage.module.css';
import Navigation from '../../components/navigation/Navigation';

//Will complete this at the end so that we can attach some videos of the app working in real time

const Homepage = () => {
  return (
    <React.Fragment>
      <div className={styles.homepageHeader}>
        <Navigation />
      </div>
      <div className={styles.homepageMain}>
        <h1 className={styles.homepageTitle}>Hungry Panda!</h1>
        <div className={styles.homepageFeatures}>
          <h1>features</h1>
        </div>
        <div className={styles.hompageCTA}>
          <h1>create an account</h1>
        </div>
      </div>
      <div className={styles.footerSection}>
        <h1>footer</h1>
      </div>
    </React.Fragment>
  );
};

export default Homepage;
