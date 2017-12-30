var request = require("request");

const getNested = (theObject, path, separator) => {
  try {
    separator = separator || ".";

    return path
      .replace("[", separator)
      .replace("]", "")
      .split(separator)
      .reduce(function(obj, property) {
        return obj[property];
      }, theObject);
  } catch (err) {
    return undefined;
  }
};

const getBussesForStop = (stop, callback) => {
  let busRequest =
    "http://data.itsfactory.fi/journeys/api/1/stop-monitoring?stops=" + stop;
  let busObject;
  let bussesForStop = [];
  let bus;
  request(busRequest, { timeout: 10000 }, (error, response, body) => {
    busObject = JSON.parse(body);
    console.log("Incoming busses request: ", busObject);
    let path = "body." + stop;
    let arr = getNested(busObject, path);
    if (arr !== undefined) {
      for (let i = 0; i < arr.length; i++) {
        let lineRef = arr[i].lineRef;
        let location = arr[i].vehicleLocation;
        let arrival = arr[i].call.expectedArrivalTime;
        let onStop = arr[i].call.vehicleAtStop;
        bus = {
          line: lineRef,
          location: location,
          arrival: arrival,
          arrivingIn: undefined,
          distance: undefined,
          visible: true,
          onStop: onStop
        };
        bussesForStop.push(bus);
      }
      callback(bussesForStop);
    } else {
      callback(undefined);
    }
  });
};

export default getBussesForStop;
