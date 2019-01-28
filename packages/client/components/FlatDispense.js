import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { selectors, actionCreators } from "../ClientStore";

const { getIsAuthenticated, getUser, getFlatWaterStatus } = selectors;
const { turnOnFlatWater, turnOffFlatWater } = actionCreators;

class FlatDispense extends Component {
  dispenseFlatWater() {
    const { flatWaterStatus } = this.props;

    if (flatWaterStatus) {
      this.props.turnOffFlatWater();
    } else {
      this.props.turnOnFlatWater();
    }
  }

  render() {
    const { isAuthenticated, flatWaterStatus } = this.props;

    return (
      <div>
        <h1>Flat Water Dispense</h1>
        <p>Press the button below to dispense your water:</p>

        <button onClick={this.dispenseFlatWater.bind(this)}>
          {flatWaterStatus ? "Stop" : "Dispense"}
        </button>

        {isAuthenticated ? (
          <p>
            Hey {this.props.user.firstName}, enjoy the water, your consumption
            is being tracked in the app!
          </p>
        ) : (
          <p>Consider creating a Carbon8 account to track your consumption!</p>
        )}

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
    user: getUser(state),
    isAuthenticated: getIsAuthenticated(state),
    flatWaterStatus: getFlatWaterStatus(state)
  };
}

export default connect(
  mapStateToProps,
  {
    turnOnFlatWater,
    turnOffFlatWater
  }
)(FlatDispense);
