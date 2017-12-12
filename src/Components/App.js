import React from "react";
import Header from "./Header";
import Settings from "./Settings";
import BusLocation from "../Utils/BusLocation";
import StopLocation from "../Utils/StopLocation";
import DistanceCalculator from "../Utils/DistanceCalculator";

class App extends React.Component {
  constructor(props) {
    super(props);
    const distance = DistanceCalculator(BusLocation("3A"), StopLocation("3A"));
    console.log(distance);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Settings />
      </div>
    );
  }
}

export default App;
