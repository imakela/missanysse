import React from "react";
const _ = require("lodash");

const getUnique = busArr => {
  return [...new Set(busArr.map(bus => bus.line))];
};

const Busses = props => {
  let uniqueLines;
  const anyBusses = props.incomingBusses.length > 0 ? true : false;
  if (anyBusses) {
    uniqueLines = getUnique(props.incomingBusses);
    console.log(uniqueLines);
  }
  return (
    <div className="busicons">
      {anyBusses &&
        _.range(uniqueLines.length).map(i => (
          <div key={i}>{uniqueLines.line}</div>
        ))}
    </div>
  );
};

export default Busses;
