import React, { Component } from "react";
import { AiOutlineForward, AiOutlinePlayCircle, AiOutlinePause, AiOutlineBackward, AiOutlineMenuUnfold } from "react-icons/ai";
import styles from '../styles/Wheel.module.css';

export default class Wheel extends Component {
  render() {
    return (
      <div className={styles.wheelContainer} id='wheel-container'>
        <div className={styles.wheel} id='wheel'>
          <div className={styles.wheelControl} id={styles.menu}>
            <AiOutlineMenuUnfold />
          </div>
          <div className={styles.wheelControl} id={styles.forward}>
            <AiOutlineForward />
          </div>
          <div className={styles.wheelControl} id={styles.playpause}>
            <AiOutlinePlayCircle />
            <AiOutlinePause />
          </div>
          <div className={styles.wheelControl} id={styles.reverse}>
            <AiOutlineBackward />
          </div>
        </div>
        <div className={styles.wheelCenter} id={styles.okbutton}></div>
      </div>
    );
  }
}
