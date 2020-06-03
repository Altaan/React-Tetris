export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// This function is invoked in Tetris component as it's passed as prop to Stage component
export const createStage = () => {
  return Array.from(Array(STAGE_HEIGHT), () => {
    return new Array(STAGE_WIDTH).fill([0, "clear"]);
  });
};
