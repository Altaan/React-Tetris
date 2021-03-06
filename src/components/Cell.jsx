import React from "react";

import { StyledCell } from "./styles/StyledCell";
import { TETROMINOS } from "../tetrominos";

// This component represents the cells inside the stage
const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color} />
);

export default React.memo(Cell);
