import React from "react";
import FontAwesome from "react-fontawesome";
import "../Styles/FontAwesome/css/font-awesome.css";

const ErrorScreen = props => {
  return (
    <div className="content">
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
