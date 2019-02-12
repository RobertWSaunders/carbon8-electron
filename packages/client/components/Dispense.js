import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { selectors, actionCreators } from "../ClientStore";

const { getIsAuthenticated, getSparklingWaterStatus } = selectors;
const { turnOnSparklingWater, turnOffSparklingWater } = actionCreators;

class Dispense extends Component {
  dispenseSparklingWater() {
    const { sparklingWaterStatus } = this.props;

    if (sparklingWaterStatus) {
      this.props.turnOffSparklingWater();
    } else {
      this.props.turnOnSparklingWater();
    }
  }

  render() {
    const { sparklingWaterStatus } = this.props;

    return (
      <div>
        <h1>Sparkling Water Dispense</h1>
        <p>Press the button below to dispense your sparkling water:</p>

        <button onClick={this.dispenseSparklingWater.bind(this)}>
          {sparklingWaterStatus ? "Stop" : "Dispense"}
        </button>

        <br />
        <br />

        <Link to="/">Done</Link>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    isAuthenticated: getIsAuthenticated(state),
    sparklingWaterStatus: getSparklingWaterStatus(state)
  };
}

export default connect(
  mapStateToProps,
  {
    turnOnSparklingWater,
    turnOffSparklingWater
  }
)(Dispense);
