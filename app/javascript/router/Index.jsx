import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage";
import Recipes from "../components/Recipes/Index";


export default (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/recipes" exact component={Recipes} />
    </Switch>
  </Router>
);