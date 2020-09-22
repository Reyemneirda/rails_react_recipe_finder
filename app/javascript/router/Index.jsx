import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
    </Switch>
  </Router>
);