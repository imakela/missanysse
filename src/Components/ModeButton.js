import React from "react";

const ModeButton = props => {
  let text =
    props.mode === "search" ? "Stops close to you" : "Search for stops";
  return (
    <button className="modebutton" onClick={() => props.changeMode()}>
      {text}
    </button>
  );
};

export default ModeButton;
