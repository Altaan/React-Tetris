import React from "react";

import { StyledStage } from "./styles/StyledStage";

import Cell from "./Cell";

// This component will contain the cells where the tetris block will be rendered
const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {
      // mapping through the stage to create cells
      stage.map((row) =>
        row.map((cell, idx) => <Cell key={idx} type={cell[0]} />)
      )
    }
  </StyledStage>
);

export default Stage;
