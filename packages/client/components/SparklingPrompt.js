import React, { Component } from "react";
import { Link } from "react-router-dom";

class SparklingPrompt extends Component {
  render() {
    return (
      <div>
        <h1>Sparkling Water Prompt</h1>
        <p>
          In order to have sparkling water you must be a subscribed Carbon8
          user. Please press Next to scan your barcode or Cancel to go back.
        </p>
        <Link to="/scan-code">Next</Link>&nbsp;&nbsp;
        <Link to="/">Cancel</Link>
      </div>
    );
  }
}

export default SparklingPrompt;
