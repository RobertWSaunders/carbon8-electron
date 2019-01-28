import React, { Component } from "react";
import { Link } from "react-router-dom";

class FlatPrompt extends Component {
  render() {
    return (
      <div>
        <h1>Flat Water Prompt</h1>
        <p>
          Would you like to scan your barcode in the Carbon8 app to track
          consumption?
        </p>
        <Link to={{ pathname: "/scan-code", state: { waterType: "FLAT" } }}>
          Yes
        </Link>
        &nbsp;&nbsp;
        <Link to="/flat-dispense">No</Link>&nbsp;&nbsp;
        <Link to="/">Cancel</Link>
      </div>
    );
  }
}

export default FlatPrompt;
