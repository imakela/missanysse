import React from "react";
var _ = require("lodash");

const StopInfo = (props) => {
    let stop = props.chosenStop !== null ? props.chosenStop.name + "(" + props.chosenStop.shortName + ")"
                                         : "You havent chosen a stop!";
    let anyBusses = props.incomingBusses.length > 0 ? true : false;
    return(
        <div className="stopinfo">
            <p>{stop}</p>
            {anyBusses &&
                _.range(props.incomingBusses.length).map(i => (
                    <p key={i}>{props.incomingBusses[i].line}</p>
                ))
            }
            {(!anyBusses && props.chosenStop !== null) &&
                <p>Sorry, no busses coming :(</p>
            }
        </div>
    );
};


export default StopInfo;