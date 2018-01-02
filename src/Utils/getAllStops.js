var request = require("request");

const getAllStops = callback => {
  let stopsObject;
  let allStops = [];
  let stopReq = "http://data.itsfactory.fi/journeys/api/1/stop-points";
  request(stopReq, { timeout: 10000 }, (error, response, body) => {
    stopsObject = JSON.parse(body);
    console.log("All stops request object: ", stopsObject);
    let stop;
    for (let i = 0; i < stopsObject.body.length; i++) {
      stop = {
        name: stopsObject.body[i].name,
        shortName: stopsObject.body[i].shortName,
        location: stopsObject.body[i].location
      };
      allStops.push(stop);
    }
    callback(allStops);
  });
};

export default getAllStops;
