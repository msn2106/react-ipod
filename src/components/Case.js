import React, { Component } from 'react'
import Screen from './Screen'
import Wheel from './Wheel'

class Case extends Component {
  render() {
    return (
      <div>
        <Screen/>
        <Wheel/>
      </div>
    )
  }
}

export default Case;
