import React from "react";
import Header from "./Header";
import Settings from "./Settings";
import Distance from "./Distance";
import busLocation from "../Utils/busLocation";
import stopLocation from "../Utils/stopLocation";
import distanceCalculator from "../Utils/distanceCalculator";
import getAllBusses from "../Utils/getAllBusses";

const getCoordinates = (bus, stop, callback) => {
  let busLoc;
  let stopLoc;
  busLocation(bus, busCoordinates => {
    busLoc = busCoordinates;
    stopLocation(stop, stopCoordinates => {
      stopLoc = stopCoordinates;
      callback(busLoc, stopLoc);
    });
  });
};

const calculateDistance = (bus, stop, callback) => {
  getCoordinates(bus, stop, (busLoc, stopLoc) => {
    let d = distanceCalculator(busLoc, stopLoc);
    callback(d);
  });
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: null
    };
  }

  componentDidMount() {
    calculateDistance("3A", "3A", d => {
      this.setState({
        distance: d
      });
    });
    getAllBusses();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Settings />
        <Distance distance={this.state.distance} />
      </div>
    );
  }
}

export default App;
