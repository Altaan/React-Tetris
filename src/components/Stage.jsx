import React from "react";

import Cell from "./Cell";

// This component will contain the cells where the tetris block will be rendered
const Stage = ({ stage }) => (
  <div>
    <Cell />
  </div>
);

export default Stage;
