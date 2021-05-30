import React, { useState } from "react";
import { Route, Router, Switch } from 'react-router-dom';
import Toaster from "./components/Toaster";
import ToasterMenu from "./components/ToasterMenu";
import ToasterQuiz from "./components/ToasterQuiz";
import ToasterLightsOut from "./components/ToasterLightsOut";
import ToasterFlappyToast from "./components/ToasterFlappyToast";
import HighScores from "./components/HighScores";
import './sass/main.scss';

const sessionId = Math.random().toString(36).slice(-5);

function App() {
  const [stage, setStage] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [toastOutComplete, setToastOutComplete] = useState(false);
  const [flappyComplete, setFlappyComplete] = useState(false);

  function calculateSore(){
    var score = 0;
    if(quizComplete === true){score++}
    if(toastOutComplete === true){score++}
    if(flappyComplete === true){score++}
    return score;
  }
  
  var page;
  switch(stage){
    case 0: 
    page = <Toaster sessionId={sessionId} changeStage={setStage} userScore={calculateSore()} changeUserScore={setUserScore} />
    break;
    case 1: 
    page = <ToasterQuiz changeStage={setStage} stageStatus={() => setQuizComplete(true)} />
    break;
    case 2: 
    page = <ToasterLightsOut changeStage={setStage} stageStatus={() => setToastOutComplete(true)} />
    break;
    case 3: 
    page = <ToasterFlappyToast changeStage={setStage} stageStatus={() => setFlappyComplete(true)} />
    break;
    case 10: 
    page = <ToasterMenu changeStage={setStage} />
  }

  return (
    <div>
    <Switch>
      <Route exact path="/highscores"><HighScores /></Route>
      <Route path="/">{page}</Route>
    </Switch>
    </div>
  )
}

export default App
