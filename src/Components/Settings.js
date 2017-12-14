import React from "react";
var _ = require("lodash");

const Settings = (props) => {
  return (
    <div className="settings">
      
      <div className="search">
        <input type="text" className="searchfield" onKeyUp={e => props.stopSearch(e)} />
      </div>
      <ul>
        {_.range(props.visibleStops.length).map(i => (
          <li key={i} className="stopslist">{props.visibleStops[i].name}({props.visibleStops[i].shortName})</li>
        ))}
      </ul>
    </div>
  );
};

export default Settings;
