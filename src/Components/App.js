import React from "react";
import Header from "./Header";
import Settings from "./Settings";
import StopInfo from "./StopInfo";
import Busses from "./Busses";
import distanceCalculator from "../Utils/distanceCalculator";
import getAllStops from "../Utils/getAllStops";
import getBussesForStop from "../Utils/getBussesForStop";
import uniqueBusses from "../Utils/uniqueBusses";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stops: null,
      visibleStops: [],
      chosenStop: null,
      incomingBusses: [],
      busLines: [],
      visibleBusses: [],
      autoUpdate: false,
      firstLoad: true
    };
  }

  componentDidMount() {
    getAllStops(allStops => {
      this.setState({
        stops: allStops
      });
    });
  }

  componentDidUpdate() {
    if (!this.state.autoUpdate && !this.state.firstLoad) {
      console.log("Updating initialized");
      this.initUpdating();
    }
  }

  initUpdating = () => {
    this.setState({ autoUpdate: true }, () => {
      setTimeout(() => {
        console.log("Executing update...");
        this.update();
        this.initUpdating();
      }, 15000);
    });
  };

  stopSearch = e => {
    const terms = e.target.value.toUpperCase();
    const stopsToShow = [];
    if (terms.length > 2) {
      for (let i = 0; i < this.state.stops.length; i++) {
        const compareName = this.state.stops[i].name;
        const compareNum = this.state.stops[i].shortName;
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

  orderInArrival = busses => {
    if (busses.length > 1) {
      busses.sort((a, b) => a.arrivingIn - b.arrivingIn);
    }
  };

  getDistances = bus => {
    if (bus.onStop) {
      bus.distance = 0;
      return;
    }
    const stopLocation = this.state.chosenStop.location;
    const stopLocationSplit = stopLocation.split(",");
    const stopLocObj = {
      longitude: Number(stopLocationSplit[1]),
      latitude: Number(stopLocationSplit[0])
    };
    bus.distance = Math.round(distanceCalculator(bus.location, stopLocObj));
  };

  showIncomingBusses = busses => {
    if (busses !== undefined) {
      for (let i = busses.length - 1; i >= 0; i--) {
        this.getDistances(busses[i]);
        this.getTimeDifference(busses[i]);
        if (busses[i].arrivingIn < -7) {
          busses.splice(i, 1);
        }
      }
      this.orderInArrival(busses);
      const uniqBusses = uniqueBusses(busses);
      this.setState({
        incomingBusses: busses,
        busLines: uniqBusses,
        visibleBusses: uniqBusses
      });
    } else {
      this.setState({
        incomingBusses: [],
        visibleBusses: [],
        busLines: []
      });
    }
  };

  chooseStop = stop => {
    this.setState(
      {
        chosenStop: stop,
        visibleStops: [],
        firstLoad: false
      },
      getBussesForStop(stop.shortName, this.showIncomingBusses)
    );
  };

  setVisibleBusses = line => {
    this.setState(prevState => ({
      visibleBusses:
        prevState.visibleBusses.indexOf(line) > -1
          ? prevState.visibleBusses.filter(
              (_, i) => prevState.visibleBusses[i] !== line
            )
          : prevState.visibleBusses.concat([line])
    }));
  };

  cleanUpVisibleBusses = () => {
    if (this.state.busLines.length < this.state.visibleBusses.length) {
      this.setState(prevState => ({
        visibleBusses: prevState.visibleBusses.filter(
          (_, i) => prevState.busLines.indexOf(prevState.visibleBusses[i]) > -1
        )
      }));
    }
  };

  addNewVisible = (busses, prevBusses, visibleBusses) =>
    visibleBusses.concat(busses.filter(bus => prevBusses.indexOf(bus) < 0));

  update = () => {
    getBussesForStop(this.state.chosenStop.shortName, busses => {
      if (busses !== undefined) {
        for (let i = busses.length - 1; i >= 0; i--) {
          this.getDistances(busses[i]);
          this.getTimeDifference(busses[i]);
          if (busses[i].arrivingIn < -7) {
            busses.splice(i, 1);
          }
        }
        this.orderInArrival(busses);
        const uniqBusses = uniqueBusses(busses);
        this.setState(
          prevState => ({
            incomingBusses: busses,
            busLines: uniqBusses,
            autoUpdate: true,
            visibleBusses:
              prevState.busLines.length !== uniqBusses.length
                ? this.addNewVisible(
                    uniqBusses,
                    prevState.busLines,
                    prevState.visibleBusses
                  )
                : prevState.visibleBusses
          }),
          this.cleanUpVisibleBusses
        );
      } else {
        this.setState({
          incomingBusses: [],
          busLines: []
        });
      }
    });
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
          <Busses
            incomingBusses={this.state.incomingBusses}
            busLines={this.state.busLines}
            visibleBusses={this.state.visibleBusses}
            chosenStop={this.state.chosenStop}
            setVisibleBusses={this.setVisibleBusses}
          />
          <StopInfo
            chosenStop={this.state.chosenStop}
            incomingBusses={this.state.incomingBusses}
            visibleBusses={this.state.visibleBusses}
          />
        </div>
      </div>
    );
  }
}

export default App;
