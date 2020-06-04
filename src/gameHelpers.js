export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// This function is invoked in Tetris component as it's passed as prop to Stage component
export const createStage = () => {
  return Array.from(Array(STAGE_HEIGHT), () => {
    return new Array(STAGE_WIDTH).fill([0, "clear"]);
  });
};

// This function is used for detecting collision
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      // checking if this is a tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // checking if the move is inside the stage height (y)
          !stage[y + player.pos.y + moveY] ||
          // checking if the tetromino is within the stage width
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // checking if the cell is set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
};
