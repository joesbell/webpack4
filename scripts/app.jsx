import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./home";
import Slide from "./slide";
export default function App() {
  return (
    <div>
      <Link to="/">home</Link>
      <Link to="/slide">slide</Link>
      <Switch>
        <Route path="/" exact render={() => <Home />}></Route>
        <Route path="/slide" exact render={() => <Slide />}></Route>
      </Switch>
    </div>
  );
}
