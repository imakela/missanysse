const getTimeDifference = bus => {
  const today = new Date();
  const arrival = new Date(bus.arrival);
  const depart = new Date(bus.depart);
  const arrivalDifference = arrival.getTime() - today.getTime();
  const departDifference = depart.getTime() - today.getTime();
  const arrivalInMinutes = Math.round(arrivalDifference / 60000);
  const departInMinutes = Math.round(departDifference / 60000);
  if (arrivalInMinutes < -7) {
    bus.arrivingIn = arrivalInMinutes;
  } else {
    bus.arrivingIn = arrivalInMinutes < 0 ? 0 : arrivalInMinutes;
  }
  if (isNaN(bus.arrivingIn)) {
    bus.arrivingIn = 0;
  }
  bus.departingIn = departInMinutes < 0 ? 0 : departInMinutes;
};

export default getTimeDifference;
