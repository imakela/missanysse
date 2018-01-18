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
    "https://limitless-depths-27510.herokuapp.com/stop-monitoring/" + stop;
  let busObject;
  let bussesForStop = [];
  let bus;
  request(busRequest, { timeout: 5000 }, (error, response, body) => {
    if (!error) {
      busObject = JSON.parse(body);
      //console.log("Incoming busses request: ", busObject);
      if (busObject.status !== "error") {
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
      } else {
        callback({
          error: "Failed to fetch busses for stop.",
          type: "busses"
        });
      }
    } else {
      //console.log(error);
      callback({
        error: "Failed to fetch busses for stop.",
        type: "busses"
      });
    }
  });
};

export default getBussesForStop;
