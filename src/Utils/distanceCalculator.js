const toRadians = num => {
  return num * Math.PI / 180;
};

const distanceCalculator = (busLoc, stopLoc) => {
  console.log("Buslocation inside calculator: ", busLoc);
  console.log("Stoplocation inside calculator: ", stopLoc);
  let R = 6371e3; // metres
  let l1 = toRadians(busLoc.lat);
  let l2 = toRadians(stopLoc.lat);
  let latd = toRadians(stopLoc.lat - busLoc.lat);
  let lond = toRadians(stopLoc.lon - busLoc.lon);
  let a =
    Math.sin(latd / 2) * Math.sin(latd / 2) +
    Math.cos(l1) * Math.cos(l2) * Math.sin(lond / 2) * Math.sin(lond / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d;
};

export default distanceCalculator;
