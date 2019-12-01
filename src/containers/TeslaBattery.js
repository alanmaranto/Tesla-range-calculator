import React, { Component } from "react";
import { getModelData } from '../services/BatteryService';
import { carModels } from '../constants/carModels';
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

  componentDidMount() {
      this.statsUpdate();
  }

  calculateStats = (models, value) => {
      const dataModels = getModelData();
      return models.map(model => {
          const { speed, temperature, climate, wheels } = value;
          const miles = dataModels[model][wheels][climate ? 'on' : 'off'].speed[speed][temperature];
          return {
              model,
              miles
          };
      });
  }

  statsUpdate = () => {
      const { config } = this.state;
    this.setState({
        carstats: this.calculateStats(carModels, config)
    })
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
