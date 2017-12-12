import React from "react";
var request = require("request");

const StopLocation = line => {
  let location = [];
  let linesRequest =
    "http://data.itsfactory.fi/journeys/api/1/journeys?lineId=" + line;
  request(linesRequest, function(error, response, body) {
    let stops = JSON.parse(body);
    let stopLocation = stops.body[0].calls[0].stopPoint.location;
    console.log(stopLocation);
    let stopLocationSplit = stopLocation.split(",");
    location.push(Number(stopLocationSplit[0]));
    location.push(Number(stopLocationSplit[1]));
  });
  return location;
};

export default StopLocation;
