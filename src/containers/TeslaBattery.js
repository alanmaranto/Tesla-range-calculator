import React, { Component } from "react";
import "./TeslaBattery.css";
import TeslaNotice from "../components/TeslaNotice/TeslaNotice";
import TeslaCar from "../components/TeslaCar/TeslaCar";

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
    const { config } = this.state;
    return (
      <form className="tesla-battery">
        <h1>Range Per Charge</h1>
        <TeslaCar wheelsize={config.wheels}/>
        <TeslaNotice />
      </form>
    );
  }
}

export default TeslaBattery;
