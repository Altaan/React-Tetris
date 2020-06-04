import { useState, useCallback } from "react";

import { TETROMINOS, randomTetromino } from "../tetrominos";
import { STAGE_WIDTH, checkCollision } from "../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  // rotating the tetromino
  const rotate = (matrix, dir) => {
    // shift the rows to be columns (transpose)
    const rotatedTetro = matrix.map((_, idx) => matrix.map((col) => col[idx]));
    // reverse rows to get rotated matrix
    if (dir > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  };

  // checking for collision while rotating
  const playerRotate = (stage, dir) => {
    // creating deep clone of the player
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    // collision prevention while rotating a tetromino
    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

  // updating the player position with the new direction passed from Tetris component
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
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
  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
