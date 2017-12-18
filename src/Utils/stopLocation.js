var request = require("request");

const stopLocation = (stop, callback) => {
  let stopCoordinates = { lat: 0, lon: 0 };
  let stopRequest =
    "http://data.itsfactory.fi/journeys/api/1/journeys?lineId=" + stop;
  request(stopRequest, (error, response, body) => {
    let stopInfo = JSON.parse(body);
    console.log("Stop info:", stopInfo);
    let stopLoc = stopInfo.body[0].calls[0].stopPoint.location;
    let stopCoordinatesSplit = stopLoc.split(",");
    stopCoordinates.lat = Number(stopCoordinatesSplit[0]);
    stopCoordinates.lon = Number(stopCoordinatesSplit[1]);
    callback(stopCoordinates);
  });
};

export default stopLocation;
