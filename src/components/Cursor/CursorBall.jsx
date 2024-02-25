import React from 'react';

import "./CursorBall.css";

const CursorBall = ({
  id,
}) => {
  return (
    <div
      id={ `cursorBall-${id}` }
      className="cursor-ball"
    ></div>
  );
}

export default CursorBall;
