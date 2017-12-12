import React from "react";
var request = require("request");

const getLocation = (error, response, body) => {
  let location = [];
  let bus = JSON.parse(body);
  console.log(bus);
  let line =
    bus.Siri.ServiceDelivery.VehicleMonitoringDelivery[0].VehicleActivity[0]
      .MonitoredVehicleJourney.LineRef.value;
  let busLocationLat =
    bus.Siri.ServiceDelivery.VehicleMonitoringDelivery[0].VehicleActivity[0]
      .MonitoredVehicleJourney.VehicleLocation.Latitude;
  let busLocationLon =
    bus.Siri.ServiceDelivery.VehicleMonitoringDelivery[0].VehicleActivity[0]
      .MonitoredVehicleJourney.VehicleLocation.Longitude;
  location.push(Number(busLocationLat));
  location.push(Number(busLocationLon));
  console.log(location);
  return location;
};

const BusLocation = busLine => {
  let busRequest =
    "http://data.itsfactory.fi/siriaccess/vm/json?lineRef=" + busLine;
  request(busRequest, getLocation);
};

export default BusLocation;
