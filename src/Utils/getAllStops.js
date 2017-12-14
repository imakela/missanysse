var request = require("request");

const getAllStops = (callback) => {
  let stopsObject;
  let allStops = [];
  let stopReq = "http://data.itsfactory.fi/journeys/api/1/stop-points";
  request(stopReq, (error, response, body) => {
    stopsObject = JSON.parse(body);
    console.log(stopsObject);
    let len = stopsObject.body.length;
    let stop;
    let stopName;
    let stopShortName;
    let stopUrl;
    for(let i = 0; i < len; i++) {
      stopName = stopsObject.body[i].name;
      stopShortName = stopsObject.body[i].shortName;
      stopUrl = stopsObject.body[i].url;
      stop = {name: stopName, shortName: stopShortName, url: stopUrl};
      allStops.push(stop);
    }
    console.log(allStops);
    callback(allStops);
  });
};

export default getAllStops;
