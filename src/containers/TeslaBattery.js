import React, { Component } from "react";
import "./TeslaBattery.css";
import TeslaNotice from "../components/TeslaNotice/TeslaNotice";
import TeslaCar from "../components/TeslaCar/TeslaCar";
import TeslaStats from '../components/TeslaStats/TeslaStats';

const config = {
  speed: 55,
  temperature: 20,
  climate: true,
  wheels: 19
};

const initialState = {
  config,
  carstats: []
};

class TeslaBattery extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  render() {
    const { config, carstats } = this.state;
    return (
      <form className="tesla-battery">
        <h1>Range Per Charge</h1>
        <TeslaCar wheelsize={config.wheels} />
        <TeslaStats carstats={carstats} />
        <TeslaNotice />
      </form>
    );
  }
}

export default TeslaBattery;
