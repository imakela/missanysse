import React from "react";

const Distance = props => {
  return (
    <div className="distance">
      <p>Distance to your bus is {Math.round(props.distance)} meters </p>
    </div>
  );
};

export default Distance;
