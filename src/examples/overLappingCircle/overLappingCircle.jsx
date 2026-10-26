import React from "react";

import "./overLappingCircle.css";

const getRamdomColor = () => {
  const colorPrefix = "0123456789ABCDEF";
  let ramdomColor = "#";
  for (let i = 0; i < 6; i++) {
    const ramdomNumber = Math.floor(Math.random() * 16); // this will give ramdom number from 1 to 16
    ramdomColor += colorPrefix[ramdomNumber];
  }
  return ramdomColor;
};

// use this in case of sqaure, for circle we can use distance formula
const isOverlapping = (point1, point2) => {
  const isCollide = !(
    point1.top > point2.bottom || // box1 is completely on top of box 2
    point1.bottom < point2.top || // box1 is completely on bottom of box 2
    point1.right < point2.left || // box1 is completely on the left side of box2
    point1.left > point2.right // box1 is completely on the right side of box2
  );

  return isCollide;
};

const isOverlapping2 = (point1, point2) => {
   return  Math.sqrt(Math.pow(point1.top - point2.top, 2) + Math.pow(point1.left - point2.left, 2)) < 200
}

const Circle = (props) => {
  return (
      <div
        className="circle"
      style={{
        position: "absolute",
        left: props.left,
        top: props.top,
        backgroundColor: props.color,
      }}
    ></div>
  );
};

export const OverLappingCircle = () => {
  const [coordinates, setCoordinates] = React.useState([]);

  const containerRef = React.useRef(null);

  const drawCircle = React.useCallback((e) => {
    const x = e.clientX;
    const y = e.clientY;

    setCoordinates((prev) => {
      const currentPoint = {
        top: y - 100,
        bottom: y + 100,
        right: x + 100,
        left: x - 100,
        color: "red",
      };

      const totalPoints = prev.length;

      for (let i = 0; i < totalPoints; i++) {
        if (isOverlapping2(currentPoint, prev[i])) {
          currentPoint.color = getRamdomColor();
          break;
        }
      }

      return [...prev, currentPoint];
    });
  });

  React.useEffect(() => {
    containerRef.current?.addEventListener("click", drawCircle);
    return () => {
      containerRef.current?.removeEventListener("click", drawCircle);
    };
  }, [drawCircle]);

  return (
    <div className="circleContainer" ref={containerRef}>
      {coordinates.map((c) => (
        <Circle
          key={`${c.left}-${c.top}`}
          left={c.left}
          top={c.top}
          color={c.color}
        />
      ))}
    </div>
  );
};
