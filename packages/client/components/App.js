import { Switch } from "react-router-dom";
import React, { Component } from "react";
import { css } from "@emotion/core";

import NotFound from "./utils/NotFound";
import Dispense from "./Dispense";
import ScanCode from "./ScanCode";
import Overview from "./Overview";
import Route from "./utils/Route";

class App extends Component {
  render() {
    return (
      <div
        css={css`
          * {
            font-family: "Open Sans", sans-serif !important;
            cursor: none !important;
          }
          html,
          body {
            overflow: hidden;
          }
        `}
      >
        <div
          css={css`
            box-sizing: border-box;
            height: 440px;
            width: 780px;
            padding: 0;
            margin: 0;
          `}
        >
          <Switch>
            {/* Public Routes */}
            <Route path="/overview" component={Overview} type="public" />

            <Route path="/scan-code" component={ScanCode} type="public" />

            {/*Private Routes */}
            <Route path="/dispense" component={Dispense} type="private" />

            {/* Catch all routes */}
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
