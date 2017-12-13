var request = require("request");

const getAllBusses = () => {
  let bussesObject;
  let allBusses = [];
  let busReq = "http://data.itsfactory.fi/siriaccess/vm/json";
  request(busReq, (error, response, body) => {
    bussesObject = JSON.parse(body);
    console.log(bussesObject);
    bussesObject.Siri.ServiceDelivery.VehicleMonitoringDelivery[0]
      .VehicleActivity[0];
    let len =
      bussesObject.Siri.ServiceDelivery.VehicleMonitoringDelivery[0]
        .VehicleActivity.length;
    console.log(len);
    for (let i = 0; i < len; i++) {
      let bus = {
        number:
          bussesObject.Siri.ServiceDelivery.VehicleMonitoringDelivery[0]
            .VehicleActivity[i].MonitoredVehicleJourney.LineRef,
        direction:
          bussesObject.Siri.ServiceDelivery.VehicleMonitoringDelivery[0]
            .VehicleActivity[i].MonitoredVehicleJourney.DirectionRef
      };
      allBusses.push(bus);
    }
    console.log(allBusses);
  });
};

export default getAllBusses;
