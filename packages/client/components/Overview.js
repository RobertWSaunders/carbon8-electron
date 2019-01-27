import React, { Component } from "react";
import { Link } from "react-router-dom";

class Overview extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Carbon8!</h1>
        <p>What kind of water would you like?</p>
        <Link to="/flat-prompt">Flat Water</Link>&nbsp;&nbsp;
        <Link to="/sparkling-prompt">Sparkling Water</Link>
        <p>Fountain Statistics:</p>
      </div>
    );
  }
}

export default Overview;
