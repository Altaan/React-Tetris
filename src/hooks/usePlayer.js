import { useState, useCallback } from "react";

import { TETROMINOS, randomTetromino } from "../tetrominos";
import { STAGE_WIDTH } from "../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  // updating the player position with the new direction passed from Tetris component
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
    }));
  };

  // the useCallback hook is used to prevent the game from going into infinity loop
  const resetPlayer = useCallback(() => {
    setPlayer({
      // setting the position of the random tetromino approx in the middle of the stage
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  // the following will be needed in the Tetris component
  return [player, updatePlayerPos, resetPlayer];
};
