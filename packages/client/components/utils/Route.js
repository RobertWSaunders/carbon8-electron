import { Route as ReactRouterRoute, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";

import { selectors } from "../../ClientStore";

const { getIsAuthenticated } = selectors;

const Route = ({ component: ComposedComponent, type, ...rest }) => {
  class Authentication extends Component {
    handleRender(props) {
      const { isAuthenticated } = this.props;

      if (!isAuthenticated && type === "private") {
        return (
          <Redirect
            to={{
              pathname: "/overview",
              state: {
                from: props.location,
                alert: {
                  type: "info",
                  message: "You must can your barcode!",
                  status: "Oops!"
                }
              }
            }}
          />
        );
      }

      return <ComposedComponent {...props} />;
    }

    render() {
      return (
        <ReactRouterRoute {...rest} render={this.handleRender.bind(this)} />
      );
    }
  }

  function mapStateToProps(state, ownProps) {
    return {
      ...ownProps,
      isAuthenticated: getIsAuthenticated(state)
    };
  }

  const AuthenticationContainer = connect(mapStateToProps)(Authentication);

  return <AuthenticationContainer />;
};

export default Route;
