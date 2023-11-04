import React, { Component } from 'react'
import Navbar from './Navbar'
import Lockscreen from './Lockscreen'
import styles from '../styles/Screen.module.css';

export default class Screen extends Component {
  render() {
    return (
      <div className={styles.screen}>
        <Navbar/>
        <Lockscreen/>
      </div>
    )
  }
}
