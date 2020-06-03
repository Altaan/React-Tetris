import React from "react";

import { createStage } from "../gameHelpers";
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// This component wraps all other components
const Tetris = () => {
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        {/* Invoking createStage to pass a stage of 20 row and 12 columns to Stage component */}
        <Stage stage={createStage()} />
        <aside>
          <div>
            <Display text="Score" />
            <Display text="Rows" />
            <Display text="Level" />
          </div>
          <StartButton />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
