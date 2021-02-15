import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Homepage from './containers/homepage/Homepage';
import Explore from './containers/explore/Explore';
import NotFoundPage from './containers/404Page/404Page';
import Fallback from './fallback';

//component loaded using lazily

const UserPage = lazy(() => import('./containers/userPage/userPage'));
const EditAdd = lazy(() => import('./containers/editAddRecipes/editAdd'));
const MyProfile = lazy(() => import('./containers/myProfile/MyProfile'));
const Signup = lazy(() => import('./containers/authentication/Signup/Signup'));
const RecipeDetails = lazy(() =>
  import('./containers/recipeDetails/RecipeDetails')
);

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Homepage} />
        <Route path='/explore' component={Explore} />
        <Suspense fallback={<Fallback />}>
          <Route path='/myrecipes' component={UserPage} />
          <Route path='/add-recipes' component={EditAdd} />
          <Route path='/profile' component={MyProfile} />
          <Route path='/auth/signup' component={Signup} />
          <Route path='/recipeDetails/:id' component={RecipeDetails} />
        </Suspense>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
