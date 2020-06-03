import React from "react";

import { StyledDisplay } from "./styles/StyledDisplay";

// This component will render the display items like score and level aside to the stage component
const Display = ({ gameOver, text }) => (
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);

export default Display;
