import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import {
  actionCreators,
  selectors,
  FOUNTAIN_ACCESS_TOKEN_LOCAL_STORAGE_KEY
} from "../ClientStore";

const { setUser, authenticated, triggerServerConnection } = actionCreators;
const { getUser } = selectors;

class ScanCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scanCode: "",
      toFlatDispense: false,
      toSparklingDispense: false
    };
  }

  handleChange(e) {
    this.setState({ scanCode: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { scanCode } = this.state;

    try {
      const res = await axios.post(
        "http://localhost:3001/auth/sessionFromScanCode",
        {
          scanCode,
          fountainId: "be057b58-3012-4fea-8697-2a22cbf04cc7"
        }
      );

      // fire authenticated action
      this.props.authenticated();

      const { user, fountainAccessToken } = res.data;

      await localStorage.setItem(
        FOUNTAIN_ACCESS_TOKEN_LOCAL_STORAGE_KEY,
        fountainAccessToken
      );

      // set the user in redux
      this.props.setUser(user);

      // trigger connection to the server
      this.props.triggerServerConnection();

      const { waterType } = this.props.location.state;

      if (waterType === "FLAT") {
        this.setState({ toFlatDispense: true });
      } else if (waterType === "SPARKLING") {
        if (this.props.user.subscribed) {
          this.setState({ toSparklingDispense: true });
        }
      }
    } catch (err) {
      console.log(err.response);
    }
  }

  render() {
    const { toFlatDispense, toSparklingDispense } = this.state;

    if (toFlatDispense) return <Redirect to="/flat-dispense" />;
    if (toSparklingDispense) return <Redirect to="/sparkling-dispense" />;

    return (
      <div>
        <h1>Scan Code</h1>
        <p>Please enter your scan code below to proceed!</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Scan Code:</label>&nbsp;
          <input
            type="text"
            value={this.state.scanCode}
            onChange={this.handleChange.bind(this)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    user: getUser(state)
  };
}

export default connect(
  mapStateToProps,
  { setUser, triggerServerConnection, authenticated }
)(ScanCode);
