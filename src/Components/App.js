import React from "react";
import FontAwesome from "react-fontawesome";
import Cookies from "js-cookie";
import "../Styles/FontAwesome/css/font-awesome.css";
import Settings from "./Settings";
import StopInfo from "./StopInfo";
import Busses from "./Busses";
import ErrorScreen from "./ErrorScreen";
import distanceCalculator from "../Utils/distanceCalculator";
import getAllStops from "../Utils/getAllStops";
import getBussesForStop from "../Utils/getBussesForStop";
import uniqueBusses from "../Utils/uniqueBusses";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stops: [],
      stopsLoaded: false,
      visibleStops: [],
      chosenStop: null,
      incomingBusses: [],
      busLines: [],
      visibleBusses: [],
      autoUpdate: false,
      updating: false,
      firstLoad: true,
      loading: false,
      error: false,
      errorInfo: { error: "", type: "" }
    };
  }

  componentDidMount() {
    getAllStops(this.setStops);
  }

  setStops = allStops => {
    if (allStops.error) {
      this.setState(
        {
          error: true,
          errorInfo: {
            error: allStops.error,
            type: allStops.type
          }
        },
        this.handleError(allStops.type)
      );
    } else {
      this.setState(
        { stops: allStops, stopsLoaded: true },
        this.checkForPrevious
      );
    }
  };

  componentDidUpdate() {
    if (!this.state.autoUpdate && !this.state.firstLoad && !this.state.error) {
      this.initUpdating();
    }
  }

  checkForPrevious = () => {
    if (Cookies.get("previous") !== undefined) {
      let prev = JSON.parse(Cookies.get("previous"));
      this.setState(
        { chosenStop: prev, firstLoad: false, loading: true },
        getBussesForStop(prev.shortName, this.showIncomingBusses)
      );
    }
  };

  initUpdating = () => {
    this.setState({ autoUpdate: true }, () => {
      let update = setTimeout(() => {
        this.setState(
          { updating: true, loading: true },
          getBussesForStop(
            this.state.chosenStop.shortName,
            this.showIncomingBusses
          )
        );
        if (!this.state.error) {
          this.initUpdating();
        } else {
          clearTimeout(update);
        }
      }, 12000);
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
      if (busses.error) {
        this.setState(
          {
            error: true,
            errorInfo: {
              error: busses.error,
              type: busses.type
            },
            autoUpdate: false,
            loading: false,
            incomingBusses: [],
            busLines: []
          },
          this.handleError(busses.type)
        );
        return;
      }
      for (let i = busses.length - 1; i >= 0; i--) {
        this.getDistances(busses[i]);
        this.getTimeDifference(busses[i]);
        if (busses[i].arrivingIn < -7) {
          busses.splice(i, 1);
        }
      }
      this.orderInArrival(busses);
      const uniqBusses = uniqueBusses(busses);
      if (!this.state.updating) {
        this.setState({
          incomingBusses: busses,
          busLines: uniqBusses,
          visibleBusses: uniqBusses,
          error: false,
          errorInfo: { error: "", type: "" },
          loading: false
        });
      } else {
        this.setState(prevState => ({
          incomingBusses: busses,
          busLines: uniqBusses,
          visibleBusses: prevState.error ? uniqBusses : prevState.visibleBusses,
          error: false,
          errorInfo: { error: "", type: "" },
          loading: false,
          updating: false
        }));
      }
    } else {
      this.setState({
        incomingBusses: [],
        visibleBusses: [],
        updating: false,
        busLines: [],
        loading: false
      });
    }
  };

  chooseStop = stop => {
    let halfHour = 1 / 48;
    Cookies.set("previous", stop, { expires: halfHour });
    this.setState(
      {
        chosenStop: stop,
        visibleStops: [],
        firstLoad: false,
        loading: true,
        error: false,
        errorInfo: { error: "", type: "" }
      },
      getBussesForStop(stop.shortName, this.showIncomingBusses)
    );
  };

  setVisibleBusses = line => {
    if (this.state.visibleBusses.length === this.state.busLines.length) {
      this.setState(prevState => ({
        visibleBusses: prevState.visibleBusses.filter(bus => bus === line)
      }));
    } else if (this.state.visibleBusses.indexOf(line) < 0) {
      this.setState(prevState => ({
        visibleBusses: prevState.visibleBusses.concat([line])
      }));
    } else {
      this.setState(prevState => ({
        visibleBusses:
          prevState.visibleBusses.length !== 1
            ? prevState.visibleBusses.filter(bus => bus !== line)
            : prevState.busLines
      }));
    }
  };

  handleError = error => {
    if (error === "stops") {
      if (this.state.error) {
        setTimeout(() => {
          getAllStops(this.setStops);
        }, 5000);
      }
    } else if (error === "busses") {
      if (this.state.error) {
        setTimeout(() => {
          getBussesForStop(
            this.state.chosenStop.shortName,
            this.showIncomingBusses
          );
        }, 5000);
      }
    }
  };

  hideStopList = () => {
    if (this.state.visibleStops.length > 0) {
      this.setState({ visibleStops: [] });
    }
  };

  render() {
    return (
      <div className="App">
        {!this.state.error ? (
          <div className="content" onClick={() => this.hideStopList()}>
            {this.state.stopsLoaded ? (
              <Settings
                stopSearch={this.stopSearch}
                visibleStops={this.state.visibleStops}
                chosenStop={this.state.chosenStop}
                chooseStop={this.chooseStop}
              />
            ) : (
              <FontAwesome name="spinner fa-spin" className="stoploader" />
            )}
            <Busses
              incomingBusses={this.state.incomingBusses}
              busLines={this.state.busLines}
              visibleBusses={this.state.visibleBusses}
              chosenStop={this.state.chosenStop}
              setVisibleBusses={this.setVisibleBusses}
            />
            {!this.state.firstLoad ? (
              <StopInfo
                chosenStop={this.state.chosenStop}
                incomingBusses={this.state.incomingBusses}
                visibleBusses={this.state.visibleBusses}
                loading={this.state.loading}
              />
            ) : (
              <div className="startscreen">
                <h1>Missä Nysse?</h1>
                <FontAwesome className="buspic" name="bus" size="5x" />
              </div>
            )}
          </div>
        ) : (
          <ErrorScreen
            onClick={() => this.hideStopList()}
            errorInfo={this.state.errorInfo}
            stopSearch={this.stopSearch}
            visibleStops={this.state.visibleStops}
            chosenStop={this.state.chosenStop}
            chooseStop={this.chooseStop}
          />
        )}
      </div>
    );
  }
}

export default App;
