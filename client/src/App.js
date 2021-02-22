import { Switch, Route } from 'react-router-dom';

import './App.css';
import Homepage from './containers/homepage/Homepage';
import Explore from './containers/explore/Explore';
import UserPage from './containers/userPage/userPage';
import AddRecipes from './containers/AddRecipes/AddRecipes';
import EditRecipes from './containers/EditRecipes/EditRecipes';
import EditProfile from './containers/EditProfile/EditProfile';
import MyProfile from './containers/myProfile/MyProfile';
import Signup from './containers/authentication/Signup/Signup';
import RecipeDetails from './containers/recipeDetails/RecipeDetails';
import NotFoundPage from './containers/404Page/404Page';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Homepage} />
        <Route path='/explore' component={Explore} />
        <Route path='/myrecipes' component={UserPage} />
        <Route path='/add-recipes' component={AddRecipes} />
        <Route path='/profile' component={MyProfile} />
        <Route path='/auth/signup' component={Signup} />
        <Route path='/recipeDetails/:id' component={RecipeDetails} />
        <Route path='/edit-recipe/:id' component={EditRecipes} />
        <Route path='/edit-profile/:id' component={EditProfile} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
