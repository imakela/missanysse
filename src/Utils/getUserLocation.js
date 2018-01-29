const getUserLocation = callback => {
  let options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        let crd = pos.coords;
        let location = {
          latitude: crd.latitude,
          longitude: crd.longitude,
          acc: crd.accuracy
        };
        callback(location);
      },
      err => {
        callback({ error: err.code, msg: err.message });
      },
      options
    );
  } else {
    callback({
      error: "not supported",
      msg: "no browser support or no access"
    });
  }
};

export default getUserLocation;
