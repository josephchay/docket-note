import { useEffect, useState } from "react";

import CursorBall from "./CursorBall";

const CursorGroup = ({
  count,
}) => {
  let [balls, setBalls] = useState([]);

  const size = 20;
  const speed = 0.2;

  const getPositions = (e) => {
    const { clientX, clientY } = e;
    let x = clientX - size / 2;
    let y = clientY - size / 2;

    return { x, y };
  }

  useEffect(() => {
    const animateBalls = (e) => {
      let { x, y } = getPositions(e);

      balls.forEach((ball, index) => {
        ball.style.left = `${x}px`;
        ball.style.top = `${y}px`;

        ball.style.scale = (balls.length - index) / balls.length;

        const nextBall = balls[index + 1] || balls[0];
        x += (nextBall.offsetLeft - x) * speed;
        y += (nextBall.offsetTop - y) * speed;
      });
    }

    const handleMouseMove = (e) => {
      animateBalls(e);
    }

    const handleMouseEnter = (e) => {
      const { x, y } = getPositions(e);

      balls.forEach((ball) => {
        ball.style.left = `${x}px`;
        ball.style.top = `${y}px`;
        ball.style.width = `${size}px`;
        ball.style.height = `${size}px`;
        ball.style.opacity = 1;
      });
    }

    const handleMouseLeave = () => {
      balls.forEach((ball) => {
        ball.style.opacity = 0;
      });
    }

    setBalls(document.querySelectorAll(".cursor-ball"));

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, [count, balls]);

  return (
    <div className="cursor-group">
      {
        Array.from({ length: count }, (_, index) => (
          <CursorBall
            key={ index }
            id={ index }
          />
        ))
      }
    </div>
  );
}

export default CursorGroup;
