import React from "react";
import Header from "./Header";
import Settings from "./Settings";
import StopInfo from "./StopInfo";
import Busses from "./Busses";
import distanceCalculator from "../Utils/distanceCalculator";
import getAllStops from "../Utils/getAllStops";
import getBussesForStop from "../Utils/getBussesForStop";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stops: null,
      visibleStops: [],
      chosenStop: null,
      incomingBusses: []
    };
  }

  componentDidMount() {
    getAllStops(allStops => {
      this.setState({
        stops: allStops
      });
    });
  }

  stopSearch = e => {
    let terms = e.target.value.toUpperCase();
    let stopsToShow = [];
    if (terms.length > 2) {
      for (let i = 0; i < this.state.stops.length; i++) {
        let compareName = this.state.stops[i].name;
        let compareNum = this.state.stops[i].shortName;
        if (
          compareName.toUpperCase().indexOf(terms) > -1 ||
          compareNum.indexOf(terms) > -1
        ) {
          stopsToShow.push(this.state.stops[i]);
        }
      }
      this.setState({
        visibleStops: stopsToShow
      });
    } else {
      this.setState({
        visibleStops: []
      });
    }
  };

  getTimeDifference = bus => {
    let today = new Date();
    if (bus.arrival === undefined) {
      bus.arrivingIn = "?";
      return;
    }
    let arrival = new Date(bus.arrival);
    let difference = arrival.getTime() - today.getTime();
    let inMinutes = Math.round(difference / 60000);
    inMinutes = inMinutes < 0 ? 0 : inMinutes;
    bus.arrivingIn = inMinutes;
  };

  orderInArrival = busses => {
    if (busses.length > 1) {
      busses.sort((a, b) => {
        return a.arrivingIn - b.arrivingIn;
      });
    }
  };

  getDistances = bus => {
    let stopLocation = this.state.chosenStop.location;
    let stopLocationSplit = stopLocation.split(",");
    let stopLocObj = {
      longitude: Number(stopLocationSplit[1]),
      latitude: Number(stopLocationSplit[0])
    };
    bus.distance = Math.round(distanceCalculator(bus.location, stopLocObj));
  };

  showIncomingBusses = busses => {
    if (busses !== undefined) {
      for (let i = 0; i < busses.length; i++) {
        this.getTimeDifference(busses[i]);
      }
      this.orderInArrival(busses);
      for (let i = 0; i < busses.length; i++) {
        this.getDistances(busses[i]);
      }
      this.setState({
        incomingBusses: busses
      });
    } else {
      this.setState({
        incomingBusses: []
      });
    }
  };

  chooseStop = stop => {
    this.setState(
      {
        chosenStop: stop,
        visibleStops: []
      },
      getBussesForStop(stop.shortName, this.showIncomingBusses)
    );
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="content">
          <Settings
            stopSearch={this.stopSearch}
            visibleStops={this.state.visibleStops}
            chosenStop={this.state.chosenStop}
            chooseStop={this.chooseStop}
          />
          <Busses incomingBusses={this.state.incomingBusses} />
          <StopInfo
            chosenStop={this.state.chosenStop}
            incomingBusses={this.state.incomingBusses}
          />
        </div>
      </div>
    );
  }
}

export default App;
