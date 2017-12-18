import React from "react";
import Header from "./Header";
import Settings from "./Settings";
import Distance from "./Distance";
import StopInfo from "./StopInfo";
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
      chosenStop: null,
      incomingBusses: [],
    };
  }

  componentDidMount() {
    calculateDistance("3A", "3A", d => { //This is how distance is calculated and executed.
      this.setState({
        distance: d
      });
    });
    getAllStops(allStops => {
      this.setState({
        stops: allStops
      })
    });
  }

  stopSearch = (e) => {
    let terms = e.target.value.toUpperCase();
    let stopsToShow = [];
    if(terms.length > 2) {
      for (let i = 0; i < this.state.stops.length; i++) {
        let compareName = this.state.stops[i].name;
        let compareNum = this.state.stops[i].shortName;
        if ((compareName.toUpperCase().indexOf(terms) > -1) || (compareNum.indexOf(terms) > -1)) {
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

  showIncomingBusses = (busses) => {
    console.log(busses);
    if(busses !== undefined) {
      this.setState({
        incomingBusses: busses
      });
    } else {
      this.setState({
        incomingBusses: []
      });
    }
  };

  chooseStop = (stop) => {
    this.setState({ 
      chosenStop: stop,
      visibleStops: [],
    }, getBussesForStop(stop.shortName, this.showIncomingBusses));
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="content">
        <Settings stopSearch={this.stopSearch} 
                  visibleStops={this.state.visibleStops}
                  chosenStop={this.state.chosenStop}
                  chooseStop={this.chooseStop} />
        <StopInfo chosenStop={this.state.chosenStop}
                  incomingBusses={this.state.incomingBusses} />
        </div>
      </div>
    );
  }
}

export default App;
