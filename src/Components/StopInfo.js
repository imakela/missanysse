import React from "react";
var _ = require("lodash");


const StopInfo = (props) => {
    let stop = props.chosenStop !== null ? props.chosenStop.name + "(" + props.chosenStop.shortName + ")"
                                         : "";
    let anyBusses = props.incomingBusses.length > 0 ? true : false;
    return(
        <div className="stopinfo">
            <p>{stop}</p>
            <ul className="incomingbusses">
                {anyBusses &&
                    _.range(props.incomingBusses.length).map(i => (
                        <li key={i}><b>Bus: </b>{props.incomingBusses[i].line} Arriving in: 
                                {" " + props.incomingBusses[i].arrivingIn} minutes,
                                <b> Distance: </b>{props.incomingBusses[i].distance + " "} metres</li>
                    ))
                }
            </ul>
            {(!anyBusses && props.chosenStop !== null) &&
                <p>Sorry, no busses coming :(</p>
            }
        </div>
    );
};


export default StopInfo;