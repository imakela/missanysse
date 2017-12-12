import React from "react";

const toRadians = num => {
  return num * Math.PI / 180;
};

const DistanceCalculator = (busLocation, stopLocation) => {
  console.log(busLocation);
  let busLocationLat = busLocation[0];
  let busLocationLon = busLocation[1];
  let stopLocationLat = stopLocation[0];
  let stopLocationLon = stopLocation[1];
  console.log(busLocationLat);
  let R = 6371e3; // metres
  let φ1 = toRadians(busLocationLat);
  let φ2 = toRadians(stopLocationLat);
  let Δφ = toRadians(stopLocationLat - busLocationLat);
  let Δλ = toRadians(stopLocationLon - busLocationLon);

  let a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let d = R * c;
  console.log(d);
  return d;
};

export default DistanceCalculator;
