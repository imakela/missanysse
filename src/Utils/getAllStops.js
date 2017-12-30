var request = require("request");

const getAllStops = callback => {
  let stopsObject;
  let allStops = [];
  let stopReq = "http://data.itsfactory.fi/journeys/api/1/stop-points";
  request(stopReq, { timeout: 10000 }, (error, response, body) => {
    stopsObject = JSON.parse(body);
    console.log("All stops request object: ", stopsObject);
    let len = stopsObject.body.length;
    let stop;
    let stopName;
    let stopShortName;
    let stopUrl;
    let stopLoc;
    for (let i = 0; i < len; i++) {
      stopName = stopsObject.body[i].name;
      stopShortName = stopsObject.body[i].shortName;
      stopLoc = stopsObject.body[i].location;
      stopUrl = stopsObject.body[i].url;
      stop = {
        name: stopName,
        shortName: stopShortName,
        url: stopUrl,
        location: stopLoc
      };
      allStops.push(stop);
    }
    callback(allStops);
  });
};

export default getAllStops;
