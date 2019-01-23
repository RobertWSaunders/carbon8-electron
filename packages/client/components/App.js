import React, { Component } from "react";
import { connect } from "react-redux";

import { actionCreators, selectors } from "../ClientStore";

const { turnLedOn, turnLedOff } = actionCreators;
const { getLedStatus } = selectors;

class App extends Component {
  changeState() {
    if (this.props.ledStatus) {
      this.props.turnLedOff();
    } else {
      this.props.turnLedOn();
    }
  }

  render() {
    return (
      <div>
        <h1>LED Status: {`${this.props.ledStatus}`}</h1>
        <button onClick={this.changeState.bind(this)}>Toggle LED</button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    ledStatus: getLedStatus(state)
  };
}

export default connect(
  mapStateToProps,
  { turnLedOn, turnLedOff }
)(App);
