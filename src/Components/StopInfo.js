import React from "react";
import FontAwesome from "react-fontawesome";
import "../Styles/FontAwesome/css/font-awesome.css";
var _ = require("lodash");

const StopInfo = props => {
  const anyBusses = props.incomingBusses.length > 0 ? true : false;
  const bussesToShow = [];
  const scheduleLink =
    props.chosenStop !== null
      ? "http://aikataulut.tampere.fi/?stop=" +
        props.chosenStop.shortName +
        "&mobile=1"
      : "";
  if (anyBusses) {
    for (let i = 0; i < props.incomingBusses.length; i++) {
      if (props.visibleBusses.indexOf(props.incomingBusses[i].line) > -1) {
        bussesToShow.push(props.incomingBusses[i]);
      }
    }
  }
  return (
    <div>
      <div className="loadercontainer">
        {props.loading && (
          <FontAwesome name="spinner fa-spin" className="loadingspinner" />
        )}
      </div>
      <div className="stopinfo">
        <table className="incomingbusses">
          {anyBusses && (
            <tbody>
              <tr className="bustableinfo">
                <th>Line</th>
                <th>Min</th>
                <th>Distance</th>
              </tr>
              {_.range(bussesToShow.length).map(i => (
                <tr
                  key={i}
                  className={bussesToShow[i].onStop ? "bus departing" : "bus"}
                >
                  <th>
                    <b>{bussesToShow[i].line} </b>
                  </th>
                  {bussesToShow[i].onStop ? (
                    <th>
                      <b>{bussesToShow[i].departingIn}</b>
                    </th>
                  ) : (
                    <th>
                      <b>{bussesToShow[i].arrivingIn}</b>
                    </th>
                  )}
                  {bussesToShow[i].onStop ? (
                    <th>
                      <b>At stop</b>
                    </th>
                  ) : (
                    <th>
                      <b>{bussesToShow[i].distance} m</b>
                    </th>
                  )}
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {!anyBusses &&
          props.chosenStop !== null &&
          !props.loading && (
            <div className="nobusses">
              <p>Sorry, no busses coming in a while...</p>
              <img
                src={require("../Img/2000px-Bus-logoZ.png")}
                className="buspic"
                alt="bus sleeping"
                width="100"
                height="100"
              />
              <p>
                Check out full schedule and untracked busses for your stop{" "}
                <a href={scheduleLink} target="_blank">
                  Here
                </a>
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default StopInfo;
