import React, { Component } from "react";
import { getModelData } from '../services/BatteryService';
import { carModels } from '../constants/carModels';
import "./TeslaBattery.css";
import TeslaNotice from "../components/TeslaNotice/TeslaNotice";
import TeslaCar from "../components/TeslaCar/TeslaCar";
import TeslaStats from '../components/TeslaStats/TeslaStats';
import TeslaCounter from '../components/TeslaCounter/TeslaCounter';

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

  updateCounterState = (title, newValue) => {
      const { config } = this.state;
      title === 'Speed' ? config['speed'] = newValue : config['temperature'] = newValue
    //   title === 'Speed' ? config.speed = newValue : config.temperature = newValue
    this.setState({ config });
  }

  increment = (e, title) => {
      e.preventDefault();
      let currentValue, maxValue, step;
      const { config } = this.state;
      const { speed, temperature } = this.props.counterDefaultVal;
      if (title === 'Speed') {
          currentValue = config.speed;
          maxValue = speed.max;
          step = speed.step;
      } else {
          currentValue = config.temperature;
          maxValue = temperature.max;
          step = temperature.step;
      }
      if (currentValue < maxValue ) {
          const newValue = currentValue + step;
          this.updateCounterState(title, newValue)
      }
  }

  decrement = (e, title) => {
      e.preventDefault();
      let currentValue, minValue, step;
      const { config } = this.state;
      const { speed, temperature } = this.props.counterDefaultVal;
      if (title === 'Speed') {
          currentValue = config.speed;
          minValue = speed.min;
          step = speed.step;
      } else {
          currentValue = config.temperature;
          minValue = temperature.min;
          step = temperature.step;
      }
      if (currentValue > minValue) {
          const newValue = currentValue - step;
          this.updateCounterState(title, newValue)
      }
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
    const { counterDefaultVal } = this.props;
    return (
      <form className="tesla-battery">
        <h1>Range Per Charge</h1>
        <TeslaCar wheelsize={config.wheels} />
        <TeslaStats carstats={carstats} />
        <div>
            <TeslaCounter 
                currentValue={config.speed}
                initValues={counterDefaultVal.speed}
                increment={this.increment}
                decrement={this.decrement}
            />
        </div>
        <TeslaNotice />
      </form>
    );
  }
}

export default TeslaBattery;
