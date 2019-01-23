import "@babel/polyfill";

import { render } from "react-dom";
import React from "react";

const Client = () => (
  <div>
    <h1>Test</h1>
  </div>
);

render(<Client />, document.getElementById("root"));
