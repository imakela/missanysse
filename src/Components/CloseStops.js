import React from "react";
const _ = require("lodash");

const CloseStops = props => {
  return (
    <div className="settings">
      <select
        defaultValue="-1"
        onChange={event =>
          props.chooseStop(props.closestStops[event.target.value])
        }
      >
        <option className="default" style={{ display: "none" }} value="-1">
          Choose a stop close to you
        </option>
        {_.range(props.closestStops.length).map(i => (
          <option key={i} value={i}>
            {props.closestStops[i].name +
              " (" +
              props.closestStops[i].shortName +
              ")"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CloseStops;
