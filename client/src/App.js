import { Switch, Route } from 'react-router-dom';

import './App.css';
import Homepage from './containers/homepage/Homepage';
import Explore from './containers/explore/Explore';
import UserPage from './containers/userPage/userPage';
import EditAdd from './containers/editAddRecipes/editAdd';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Homepage} />
        <Route path='/explore' component={Explore} />
        <Route path='/myrecipes' component={UserPage} />
        <Route path='/add-recipes' component={EditAdd} />
      </Switch>
    </div>
  );
}

export default App;
