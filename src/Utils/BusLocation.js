var request = require("request");

const busLocation = (busLine, callback) => {
  let busCoordinates = { lat: 0, lon: 0 };
  let busRequest =
    "http://data.itsfactory.fi/siriaccess/vm/json?lineRef=" + busLine;
  request(busRequest, (error, response, body) => {
    let busInfo = JSON.parse(body);
    console.log("Bus info:", busInfo);
    busCoordinates.lat =
      busInfo.Siri.ServiceDelivery.VehicleMonitoringDelivery[0].VehicleActivity[0].MonitoredVehicleJourney.VehicleLocation.Latitude;
    busCoordinates.lon =
      busInfo.Siri.ServiceDelivery.VehicleMonitoringDelivery[0].VehicleActivity[0].MonitoredVehicleJourney.VehicleLocation.Longitude;
    callback(busCoordinates);
  });
};

export default busLocation;
