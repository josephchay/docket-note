import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from "framer-motion";

import "./CursorBall.css";

function CursorBall() {
  const size = 20;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  }

  const smoothOptions = {
    damping: 20,
    stiffness: 300,
    mass: .5
  }

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  }

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    mouse.x.set(clientX - size / 2);
    mouse.y.set(clientY - size / 2);
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    }
  });

  return (
    <motion.div
      className="cursor"
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
      }}
    ></motion.div>
  );
}

export default CursorBall;
