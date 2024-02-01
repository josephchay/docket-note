import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import './CursorBall.css';

const CursorBall = (props) => {
  const size = 32;
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  function updatePos() {
    setPos({
      x: pos.x + (props.aimCoords.x - pos.x) * props.speed,
      y: pos.y + (props.aimCoords.y - pos.y) * props.speed,
    });
  }

  useEffect(() => {
    updatePos();
  }, [props.aimCoords.x, props.aimCoords.y, props.speed]);

  return (
    <motion.div
      className="cursor-ball"
      style={{
        left: pos.x - size / 2,
        top: pos.y - size / 2,
        scale: props.scale,
      }}
    />
  );
}

export default CursorBall;
