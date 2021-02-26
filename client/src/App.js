import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Fallback from './fallback';

import Homepage from './containers/homepage/Homepage';
import Explore from './containers/explore/Explore';
import UserPage from './containers/userPage/userPage';
import AddRecipes from './containers/AddRecipes/AddRecipes';
import Signup from './containers/authentication/Signup/Signup';
import NotFoundPage from './containers/404Page/404Page';

//RECIPES RELATED LAZY LOADING
const RecipeDetails = React.lazy(() =>
  import('./containers/recipeDetails/RecipeDetails')
);
const EditRecipes = React.lazy(() =>
  import('./containers/EditRecipes/EditRecipes')
);

//USER PROFILE RELATED LAZY LOADING
const MyProfile = React.lazy(() => import('./containers/myProfile/MyProfile'));
const EditProfile = React.lazy(() =>
  import('./containers/EditProfile/EditProfile')
);
const Login = React.lazy(() =>
  import('./containers/authentication/Login/Login')
);

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Homepage} />
        <Route path='/explore' component={Explore} />
        <Route path='/add-recipes' component={AddRecipes} />
        <Route path='/auth/signup' component={Signup} />
        <Suspense fallback={<Fallback />}>
          <Route path='/myrecipes' component={UserPage} />
          <Route path='/recipeDetails/:id' component={RecipeDetails} />
          <Route path='/edit-recipe/:id' component={EditRecipes} />
          <Route path='/auth/login' component={Login} />
          <Route path='/profile' component={MyProfile} />
          <Route path='/edit-profile/:id' component={EditProfile} />
        </Suspense>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
