import { Switch, Route } from 'react-router-dom';

import './App.css';
import Homepage from './containers/homepage/Homepage';
import Explore from './containers/explore/Explore';
import UserPage from './containers/userPage/userPage';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Homepage} />
        <Route path='/explore' component={Explore} />
        <Route path='/myrecipes' component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;
