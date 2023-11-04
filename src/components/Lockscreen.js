import React, { Component } from 'react'
import styles from '../styles/Lockscreen.module.css';

export default class Lockscreen extends Component {
  render() {
    return (
      <div className={styles.bottomLockMsgDiv}>
        <h3>Press Center Button to Unlock!</h3>
      </div>
    )
  }
}
