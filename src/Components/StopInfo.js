import React from "react";
import FontAwesome from "react-fontawesome";
import "../Styles/FontAwesome/css/font-awesome.css";
var _ = require("lodash");

const StopInfo = props => {
  const anyBusses = props.incomingBusses.length > 0 ? true : false;
  const bussesToShow = [];
  const scheduleLink =
    props.chosenStop !== null
      ? "https://lissu.tampere.fi/?stop=" + props.chosenStop.shortName
      : "";
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
            <li
              key={i}
              className={bussesToShow[i].onStop ? "bus departing" : "bus"}
            >
              <b>{bussesToShow[i].line} </b>
              {bussesToShow[i].onStop ? (
                <p>
                  Departing in: <b>{bussesToShow[i].departingIn}</b>{" "}
                </p>
              ) : (
                <p>
                  Arriving in: <b>{bussesToShow[i].arrivingIn}</b>{" "}
                </p>
              )}
              min, Distance:
              {bussesToShow[i].onStop ? (
                <b> At stop</b>
              ) : (
                <b> {bussesToShow[i].distance} m</b>
              )}
            </li>
          ))}
      </ul>
      {!anyBusses &&
        props.chosenStop !== null &&
        !props.loading && (
          <div className="nobusses">
            <p>Sorry, no busses coming in a while...</p>
            <img
              src={require("../Img/2000px-Bus-logoZ.png")}
              className="buspic"
              alt="bus"
              width="100"
              height="100"
            />
            <p>
              Check out full schedule and untracked busses for your stop at{" "}
              <a href={scheduleLink} target="_blank">
                Lissu
              </a>
            </p>
          </div>
        )}
      {props.loading && <FontAwesome name="spinner fa-spin" size="2x" />}
    </div>
  );
};

export default StopInfo;
