import { Switch, Route } from 'react-router-dom';

import './App.css';
import Homepage from './containers/homepage/Homepage';
import Explore from './containers/explore/Explore';
import UserPage from './containers/userPage/userPage';
import EditAdd from './containers/editAddRecipes/editAdd';
import MyProfile from './containers/myProfile/MyProfile';
import Signup from './containers/authentication/Signup/Signup';
import NotFoundPage from './containers/404Page/404Page';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Homepage} />
        <Route path='/explore' exact component={Explore} />
        <Route path='/myrecipes' exact component={UserPage} />
        <Route path='/add-recipes' exact component={EditAdd} />
        <Route path='/profile' exact component={MyProfile} />
        <Route path='/auth/signup' exact component={Signup} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
