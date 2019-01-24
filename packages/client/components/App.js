import React, { Component } from "react";
import { connect } from "react-redux";

import { actionCreators, selectors } from "../ClientStore";

const { turnOnFlatWater, turnOffFlatWater } = actionCreators;
const { getFlatWaterStatus } = selectors;

class App extends Component {
  changeState() {
    if (this.props.flatWaterStatus) {
      this.props.turnOffFlatWater();
    } else {
      this.props.turnOnFlatWater();
    }
  }

  render() {
    return (
      <div>
        <h1>LED Status: {`${this.props.flatWaterStatus}`}</h1>
        <button onClick={this.changeState.bind(this)}>Toggle LED</button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    flatWaterStatus: getFlatWaterStatus(state)
  };
}

export default connect(
  mapStateToProps,
  { turnOnFlatWater, turnOffFlatWater }
)(App);
