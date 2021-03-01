import React from "react";
import Vs from "./components/Vs";
import StartGame from "./components/Last";
import { Route, Switch } from "react-router";
import { useState } from "react";

function App() {
  let [text, setText] = useState(null);
  let [text2, setText2] = useState(null);

  return (
    <Switch>
      <Route path="/" exact>
        <Vs text={text} text2={text2} setText={setText} setText2={setText2} />
      </Route>
      <Route path="/StartGame" exact>
        <StartGame
          text={text}
          text2={text2}
          setText={setText}
          setText2={setText2}
        />
      </Route>
    </Switch>
  );
}

export default App;
