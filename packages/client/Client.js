import "@babel/polyfill";

import { Provider } from "react-redux";
import { render } from "react-dom";
import React from "react";

import { getStore } from "./ClientStore";
import App from "./components/App";

render(
  <Provider store={getStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
