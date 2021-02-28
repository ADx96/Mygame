import React from "react";
import Vs from "./components/Vs";
import StartGame from "./components/Last";
import { Route, Switch } from "react-router";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Vs />
      </Route>
      <Route path="/StartGame" exact>
        <StartGame />
      </Route>
    </Switch>
  );
}

export default App;
