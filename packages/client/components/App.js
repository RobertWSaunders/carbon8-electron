import { Switch } from "react-router-dom";
import React, { Component } from "react";

import SparklingDispense from "./SparklingDispense";
import SparklingPrompt from "./SparklingPrompt";
import FlatDispense from "./FlatDispense";
import NotFound from "./utils/NotFound";
import FlatPrompt from "./FlatPrompt";
import ScanCode from "./ScanCode";
import Overview from "./Overview";
import Route from "./utils/Route";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* Public Routes */}
          <Route path="/overview" component={Overview} type="public" />

          <Route path="/flat-prompt" component={FlatPrompt} type="public" />
          <Route
            path="/sparkling-prompt"
            component={SparklingPrompt}
            type="public"
          />

          <Route path="/flat-dispense" component={FlatDispense} type="public" />

          <Route path="/scan-code" component={ScanCode} type="public" />

          {/*Private Routes */}
          <Route
            path="/sparkling-dispense"
            component={SparklingDispense}
            type="private"
          />

          {/* Catch all routes */}
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
