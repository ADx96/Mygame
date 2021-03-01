import React, { useEffect, useState } from "react";
import "../App.css";
import { gameSubject, initGame, resetGame } from "./Game";
import Board from "./Board";
import styled from "styled-components";

const Button = styled.button`
  background-color: cornflowerblue;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.3s;
  transition-duration: 01s;
`;

function StartGame(props) {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [turn, setTurn] = useState();
  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);
    });
    return () => subscribe.unsubscribe();
  }, []);

  const Info = (props) => {
    return (
      <div className="output">
        <h1> Marvel :{props.text}</h1>
        <br></br>
        <h2>VS</h2>
        <br></br>
        <h1> DC :{props.text2}</h1>
      </div>
    );
  };

  return (
    <div className="container">
      {isGameOver && (
        <h1 className="Details">
          GAME OVER
          <Button onClick={resetGame}>NEW GAME</Button>
        </h1>
      )}

      <h1 className="Details">
        <Button onClick={resetGame}>NEW GAME</Button>
      </h1>

      <div className="board-container">
        <Board board={board} turn={turn} />
        {result && <p className="Details">{result}</p>}
      </div>
      <Info text={props.text} text2={props.text2} />
    </div>
  );
}

export default StartGame;
