import React from "react";
var _ = require("lodash");

const StopInfo = props => {
  const anyBusses = props.incomingBusses.length > 0 ? true : false;
  const bussesToShow = [];
  if (anyBusses) {
    for (let i = 0; i < props.incomingBusses.length; i++) {
      if (props.visibleBusses.indexOf(props.incomingBusses[i].line) > -1) {
        bussesToShow.push(props.incomingBusses[i]);
      }
    }
  }
  return (
    <div className="stopinfo">
      <ul className="incomingbusses">
        {anyBusses &&
          _.range(bussesToShow.length).map(i => (
            <li key={i}>
              <b>{bussesToShow[i].line} </b>
              {bussesToShow[i].onStop
                ? "Departing in: " + bussesToShow[i].departingIn + " "
                : "Arriving in: " + bussesToShow[i].arrivingIn + " "}
              min,
              <b> Distance: </b>
              {bussesToShow[i].onStop ? (
                <b>At stop</b>
              ) : (
                bussesToShow[i].distance + " m"
              )}
            </li>
          ))}
      </ul>
      {!anyBusses &&
        props.chosenStop !== null && (
          <p>Sorry, no busses coming in a while :(</p>
        )}
    </div>
  );
};

export default StopInfo;
