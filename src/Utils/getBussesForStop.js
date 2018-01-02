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
        bus = {
          line: arr[i].lineRef,
          location: arr[i].vehicleLocation,
          arrival: arr[i].call.expectedArrivalTime,
          depart: arr[i].call.expectedDepartureTime,
          arrivingIn: undefined,
          departingIn: undefined,
          distance: undefined,
          onStop: arr[i].call.vehicleAtStop
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
