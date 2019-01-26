import React, { Component } from "react";
import { connect } from "react-redux";

import { actionCreators, selectors } from "../ClientStore";

const { turnOnFlatWater, turnOffFlatWater, fireTest } = actionCreators;
const { getFlatWaterStatus, getTest } = selectors;

class App extends Component {
  changeState() {
    if (this.props.flatWaterStatus) {
      this.props.turnOffFlatWater();
    } else {
      this.props.turnOnFlatWater();
    }
  }

  fireThing() {
    this.props.fireTest();
  }

  render() {
    return (
      <div>
        <h1>LED Status: {`${this.props.flatWaterStatus}`}</h1>
        <h1>{`${this.props.test}`}</h1>
        <button onClick={this.changeState.bind(this)}>Toggle LED</button>
        <button onClick={this.fireThing.bind(this)}>Press Me</button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    flatWaterStatus: getFlatWaterStatus(state),
    test: getTest(state)
  };
}

export default connect(
  mapStateToProps,
  { turnOnFlatWater, turnOffFlatWater, fireTest }
)(App);
