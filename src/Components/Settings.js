import React from "react";
const _ = require("lodash");

const Settings = props => {
  return (
    <div className="settings">
      <div className="search">
        <input
          type="text"
          placeholder={"Search and choose a stop"}
          className="searchfield"
          onKeyUp={e => props.stopSearch(e)}
          style={{ backgroundcolor: "#a0a0a0" }}
        />
      </div>
      {props.visibleStops.length > 0 && (
        <ul className="visiblestops">
          {_.range(props.visibleStops.length).map(i => (
            <li
              key={i}
              className="stopslist"
              onClick={() => props.chooseStop(props.visibleStops[i])}
            >
              {props.visibleStops[i].name}({props.visibleStops[i].shortName})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Settings;
