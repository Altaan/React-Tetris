import React, { useState } from "react";

import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

import { createStage } from "../gameHelpers";

import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// This component wraps all other components
const Tetris = () => {
  // droptime is the speed depending on level
  const [droptime, setDroptime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log("re-render");

  const movePlayer = (direction) => {
    updatePlayerPos({ x: direction, y: 0 });
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    resetPlayer();
  };

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false });
  };

  const dropPlayer = () => {
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
      }
    }
  };

  return (
    // The TetrisWrapper is needed to register key strikes
    <StyledTetrisWrapper
      role="button"
      tableIndex="0"
      onKeyDown={(event) => move(event)}
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
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
