import React from "react";
const _ = require("lodash");

const Busses = props => {
  const stop =
    props.chosenStop !== null
      ? props.chosenStop.name + "(" + props.chosenStop.shortName + ")"
      : "";
  const anyBusses = props.incomingBusses.length > 0 ? true : false;
  return (
    <div>
      <div className="stopname">{stop}</div>
      <div className="busicons">
        {anyBusses &&
          _.range(props.busLines.length).map(i => (
            <div
              key={i}
              className={
                props.visibleBusses.indexOf(props.busLines[i]) > -1
                  ? "busdot"
                  : "busdot passive"
              }
              onClick={() => props.setVisibleBusses(props.busLines[i])}
            >
              {props.busLines[i]}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Busses;
