import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage";
import Recipes from "../components/Recipes/Index";
import RecipeView from "../components/Recipes/View";


export default (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/recipes" exact component={Recipes} />
      <Route path="/recipe/:id" exact component={RecipeView} />
    </Switch>
  </Router>
);