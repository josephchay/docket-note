import "./constants/colors.css";
import "../src/base/commons.css";

import Home from "./pages/Home";

import './App.css';
import { Component, useEffect, useRef, useState } from "react";
import CursorBall from "./components/Cursor/CursorBall";
import CursorList from "./components/List/CursorList";

const App = () => {
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    }

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    }
  });

  return (
    <div
      className="App"
    >
      <Home/>
      <CursorList
        count={ 10 }
        aimCoords={ mousePos }
      />
    </div>
  );
}

export default App;
