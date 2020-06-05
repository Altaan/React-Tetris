import React, { useState } from "react";

import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

import { createStage, checkCollision } from "../gameHelpers";

import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// This component wraps all other components
const Tetris = () => {
  // droptime is the speed depending on level
  const [droptime, setDroptime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  console.log("re-render");

  const movePlayer = (direction) => {
    // if no collision is detected then the position can be updated
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPos({ x: direction, y: 0 });
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDroptime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    // increase level and speed when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDroptime(1000 / (level + 1) + 200);
    }
    // checking if the player pos has reached the bottom
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // game over if the pos is at the top of stage, ie the stage is full
      if (player.pos.y < 1) {
        console.log("GAME OVER!");
        setGameOver(true);
        setDroptime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  // This function is used to start the droptime interval again when the player releases the down key
  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDroptime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    // stopping the droptime interval when player presses down key
    setDroptime(null);
    drop();
  };

  // The keyCode is destructured from the event passed to this func to move the tetrominos
  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        // left arrow key
        movePlayer(-1);
      } else if (keyCode === 39) {
        // right arrow key
        movePlayer(1);
      } else if (keyCode === 40) {
        // down arrow key
        dropPlayer();
      } else if (keyCode === 38) {
        // up arrow key
        playerRotate(stage, 1);
      }
    }
  };

  // setting an interval for the droptime of each tetromino
  useInterval(() => {
    drop();
  }, droptime);

  return (
    // The TetrisWrapper is needed to register key strikes
    <StyledTetrisWrapper
      role="button"
      tableIndex="0"
      onKeyDown={(event) => move(event)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            // display game over
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            // display the aside game info if the game isn't over
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
