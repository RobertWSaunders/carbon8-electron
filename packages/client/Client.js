import "@babel/polyfill";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render } from "react-dom";
import React from "react";

import { getStore } from "./ClientStore";
import App from "./components/App";

render(
  <Provider store={getStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
