import React from "react";
const _ = require("lodash");

const getUnique = busArr => {
  return [...new Set(busArr.map(bus => bus.line))];
};

const naturalCompare = (a, b) => {
  let ax = [],
    bx = [];
  a.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
    ax.push([$1 || Infinity, $2 || ""]);
  });
  b.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
    bx.push([$1 || Infinity, $2 || ""]);
  });
  while (ax.length && bx.length) {
    let an = ax.shift();
    let bn = bx.shift();
    let nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
    if (nn) return nn;
  }
  return ax.length - bx.length;
};

const Busses = props => {
  const stop =
    props.chosenStop !== null
      ? props.chosenStop.name + "(" + props.chosenStop.shortName + ")"
      : "";
  let uniqueLines;
  const anyBusses = props.incomingBusses.length > 0 ? true : false;
  const classNames = [];
  if (anyBusses) {
    uniqueLines = getUnique(props.incomingBusses);
    if (uniqueLines.length > 1) {
      uniqueLines.sort(naturalCompare);
    }
    for (let i = 0; i < uniqueLines.length; i++) {
      for (let j = 0; j < props.incomingBusses.length; j++) {
        if (props.incomingBusses[j].line === uniqueLines[i]) {
          let isActive = props.incomingBusses[j].visible
            ? "busdot"
            : "busdot passive";
          classNames.push(isActive);
          break;
        }
      }
    }
  }
  return (
    <div>
      <div className="stopname">{stop}</div>
      <div className="busicons">
        {anyBusses &&
          _.range(uniqueLines.length).map(i => (
            <div
              key={i}
              className={classNames[i]}
              onClick={() => props.setVisibleBusses(uniqueLines[i])}
            >
              {uniqueLines[i]}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Busses;
