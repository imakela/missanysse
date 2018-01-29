import distanceCalculator from "./distanceCalculator";

const filterByDistance = userLoc => {
  return element => {
    const stopLocationSplit = element.location.split(",");
    const stopLocObj = {
      longitude: Number(stopLocationSplit[1]),
      latitude: Number(stopLocationSplit[0])
    };
    let d = distanceCalculator(userLoc, stopLocObj);
    return d < 400;
  };
};

const getClosestStops = (stops, userLoc) => {
  return stops.filter(filterByDistance(userLoc));
};

export default getClosestStops;
