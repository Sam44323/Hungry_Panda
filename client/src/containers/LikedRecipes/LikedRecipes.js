import { useEffect } from 'react';

const LikesdRecipes = (props) => {
  return <h1>{props.match.params.uid}</h1>;
};

export default LikesdRecipes;
