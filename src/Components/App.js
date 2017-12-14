import React from "react";
import Header from "./Header";
import Settings from "./Settings";
import Distance from "./Distance";
import busLocation from "../Utils/busLocation";
import stopLocation from "../Utils/stopLocation";
import distanceCalculator from "../Utils/distanceCalculator";
import getAllStops from "../Utils/getAllStops";
import getBussesForStop from "../Utils/getBussesForStop";


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
      distance: null,
      stops: null,
      visibleStops: [],
    };
  }

  componentDidMount() {
    calculateDistance("3A", "3A", d => {
      this.setState({
        distance: d
      });
    });
    getAllStops(allStops => {
      this.setState({
        stops: allStops
      })
    });
    getBussesForStop([4516]); // Chosen stop goes here, remember callback funciton.
  }

  stopSearch = (e) => {
    let terms = e.target.value.toUpperCase();
    let stopsToShow = [];
    if(terms.length > 2) {
      for (let i = 0; i < this.state.stops.length; i++) {
        let compare = this.state.stops[i].name;
        if (compare.toUpperCase().indexOf(terms) > -1) {
          stopsToShow.push(this.state.stops[i]);
        }
      }
      this.setState({
        visibleStops: stopsToShow,
      })
    } else {
      this.setState({
        visibleStops: [],
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Settings stopSearch={this.stopSearch} 
                  visibleStops={this.state.visibleStops} />
        <Distance distance={this.state.distance} />
      </div>
    );
  }
}

export default App;
