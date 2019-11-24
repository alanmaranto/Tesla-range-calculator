import React, { Component } from 'react'
import './TeslaBattery.css';
import TeslaNotice from '../components/TeslaNotice';

class TeslaBattery extends Component {
    render() { 
        return ( 
            <form className="tesla-battery">
                <h1>Range Per Charge</h1>
                <TeslaNotice />
            </form>
         );
    }
}
 
export default TeslaBattery;