import React, { Component } from "react";
import { BsBatteryHalf } from "react-icons/bs";
import styles from '../styles/Navbar.module.css';

export default class Navbar extends Component {
  render() {
    const time = new Date().getHours()+":"+(new Date().getMinutes()).toString().padStart(2,0);
    return (
      <div className={styles.navbar}>
        <h5 className={styles.heading}>ipod</h5>
        <h3 className={styles.time}>{time}</h3>
        <div className={styles.battery}>
          <BsBatteryHalf/>
        </div>
      </div>
    );
  }
}
