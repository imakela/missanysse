import React from "react";
import FontAwesome from "react-fontawesome";
import "../Styles/FontAwesome/css/font-awesome.css";
import Settings from "./Settings";

const ErrorScreen = props => {
  const fatal = props.errorInfo.type === "busses" ? false : true;
  return (
    <div className="content">
      {!fatal && (
        <Settings
          stopSearch={props.stopSearch}
          visibleStops={props.visibleStops}
          chosenStop={props.chosenStop}
          chooseStop={props.chooseStop}
        />
      )}
      <div className="error">
        <p>Error!</p>
        <p>{props.errorInfo.error}</p>
        <p>
          Retrying...{" "}
          <FontAwesome
            name="spinner fa-spin"
            className="loadingspinner"
            style={{ display: "inlineBlock", marginLeft: 100 }}
          />
        </p>
        <img
          src={require("../Img/busbroken.png")}
          className="buspic"
          alt="bus broken"
        />
      </div>
    </div>
  );
};

export default ErrorScreen;
