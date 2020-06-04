import { useState, useEffect } from "react";

import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    const updateStage = (prevStage) => {
      // creating new stage with the updated position of tetrominos
      const newStage = prevStage.map((row) =>
        // clearing the stage from the prev render if the cell has "clear" value
        // if the cell has a tetromino that collided with another tetromino then return the cell
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      // draw the tetromino, which is part of the player prop
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          // the cell would have a str value representing the tetromino shape
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              // setting the 2nd el for each cell according to if a tetromino has collided with another one or not
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });

      // if player collided with another tetromino then create new tetromino by reseting the player
      if (player.collided) {
        resetPlayer();
      }

      return newStage;
    };

    // setting the stage state
    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  // returning the stage to Tetris component
  return [stage, setStage];
};
