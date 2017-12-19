const toRadians = num => {
  return num * Math.PI / 180;
};

const distanceCalculator = (busLoc, stopLoc) => {
  let R = 6371e3;
  let l1 = toRadians(Number(busLoc.latitude));
  let l2 = toRadians(stopLoc.latitude);
  let latd = toRadians(stopLoc.latitude - Number(busLoc.latitude));
  let lond = toRadians(stopLoc.longitude - Number(busLoc.longitude));
  let a =
    Math.sin(latd / 2) * Math.sin(latd / 2) +
    Math.cos(l1) * Math.cos(l2) * Math.sin(lond / 2) * Math.sin(lond / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d;
};

export default distanceCalculator;
