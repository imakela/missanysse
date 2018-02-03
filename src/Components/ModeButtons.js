import React from "react";
import FontAwesome from "react-fontawesome";

const ModeButtons = props => {
  let search = props.mode === "search" ? true : false;
  return (
    <div className="modebuttons">
      <FontAwesome
        name="search fas"
        size="lg"
        className={search ? "modesearch active" : "modesearch"}
        onClick={!search ? () => props.changeMode() : undefined}
      />
      <FontAwesome
        name="map-marker fas"
        size="lg"
        className={search ? "modelocation" : "modelocation active"}
        onClick={search ? () => props.changeMode() : undefined}
      />
    </div>
  );
};

export default ModeButtons;
