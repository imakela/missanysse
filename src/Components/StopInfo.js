import React from "react";
var _ = require("lodash");

const StopInfo = props => {
  const stop =
    props.chosenStop !== null
      ? props.chosenStop.name + "(" + props.chosenStop.shortName + ")"
      : "";
  const anyBusses = props.incomingBusses.length > 0 ? true : false;
  let visibleBusses = [];
  if (anyBusses) {
    for (let i = 0; i < props.incomingBusses.length; i++) {
      if (props.incomingBusses[i].visible) {
        visibleBusses.push(props.incomingBusses[i]);
      }
    }
  }
  return (
    <div className="stopinfo">
      <p>{stop}</p>
      <ul className="incomingbusses">
        {anyBusses &&
          _.range(visibleBusses.length).map(i => (
            <li key={i}>
              <b>Bus: </b>
              {visibleBusses[i].line} Arriving in:
              {" " + visibleBusses[i].arrivingIn} minutes,
              <b> Distance: </b>
              {visibleBusses[i].distance + " "} metres
            </li>
          ))}
      </ul>
      {!anyBusses &&
        props.chosenStop !== null && <p>Sorry, no busses coming :(</p>}
    </div>
  );
};

export default StopInfo;
