var request = require("request");

const getNested = (theObject, path, separator) => {
    try {
        separator = separator || '.';
    
        return path.
                replace('[', separator).replace(']','').
                split(separator).
                reduce(
                    function (obj, property) { 
                        return obj[property];
                    }, theObject
                );                   
    } catch (err) {
        return undefined;
    }   
}


const getBussesForStop = stop => { // return a value by callback.
    let busRequest = "http://data.itsfactory.fi/journeys/api/1/stop-monitoring?stops=" + stop;
    let busObject;
    let bussesForStop = [];
    let bus;
    request(busRequest, (error, response, body) => {
        busObject = JSON.parse(body);
        let path = "body." + stop;
        let arr = getNested(busObject, path);
        for(let i = 0; i< arr.length; i++) {
            let lineRef = arr[i].lineRef;
            let location = arr[i].vehicleLocation;
            let arrival = arr[i].call.expectedArrivalTime;
            bus = {line: lineRef, location: location, arrival: arrival};
            bussesForStop.push(bus);
        }
        console.log(bussesForStop);
    });
};

export default getBussesForStop;