import MdArrowRoundBack from "react-ionicons/lib/MdArrowRoundBack";
import { BarLoader } from "react-spinners";
import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "@emotion/core";
import axios from "axios";

import { actionCreators, selectors } from "../ClientStore";

const { setUser, authenticate, triggerServerConnection } = actionCreators;
const { getUser, getServerSocketConnected, getAuthenticated } = selectors;

class ScanCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scanCode: "",
      toDispense: false,
      loader: true,
      loaderTitle: "Waiting for scan...",
      countdown: 30,
      scanCodeTextInputDisabled: false,
      showCountdown: true,
      scanError: false,
      scanErrorToOverview: false,
      scanSuccess: false
    };

    this.scanCodeTextInput = React.createRef();
  }

  componentDidMount() {
    this.scanCodeTextInput.current.focus();

    this.countdownInterval = setInterval(() => {
      this.setState({ countdown: this.state.countdown - 1 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.countdownInterval);
  }

  handleScanCodeTextInputChange(e) {
    this.setState({ scanCode: e.target.value });

    if (this.state.scanCode.length === 11) {
      clearInterval(this.countdownInterval);

      this.setState({
        countdown: 30,
        scanCodeTextInputDisabled: true,
        showCountdown: false,
        loaderTitle: "Checking scan code..."
      });

      this.handleScan();
    }
  }

  async handleScan() {
    const { scanCode } = this.state;

    try {
      const res = await axios.post(
        `${process.env.SERVER_SOCKET_URI}/api/auth/sessionFromScanCode`,
        {
          scanCode,
          fountainId: process.env.FOUNTAIN_UNIQUE_IDENTIFIER
        }
      );

      const { user, fountainAccessToken } = res.data;

      await localStorage.setItem(
        process.env.FOUNTAIN_ACCESS_TOKEN_LOCAL_STORAGE_KEY,
        fountainAccessToken
      );

      this.props.authenticate({
        user
      });

      this.props.triggerServerConnection();

      this.setState({ scanSuccess: true });

      setTimeout(() => {
        this.setState({
          toDispense: true
        });
      }, 2000);
    } catch (err) {
      this.setState({
        scanError: true
      });

      setTimeout(() => {
        this.setState({
          scanErrorToOverview: true
        });
      }, 3000);
    }
  }

  renderLogoHeader() {
    const { showCountdown } = this.state;

    return (
      <div
        css={css`
          margin-top: 20px;
          width: 100%;
          height: 50px;
        `}
      >
        <div
          css={`
            float: right;
            width: 200px;
            text-align: right;
            height: 50px;
          `}
        >
          {showCountdown ? (
            <div
              css={css`
                width: 30px;
                height: 30px;
                border-radius: 15px;
                font-size: 18px;
                color: #000;
                line-height: 30px;
                text-align: center;
                border: 1px solid #000;
                float: right;
                margin-right: 30px;
                margin-top: 10px;
              `}
            >
              {this.state.countdown}
            </div>
          ) : null}
        </div>
        <div
          css={`
            float: left;
            width: 200px;
            height: 50px;
          `}
        >
          <MdArrowRoundBack
            color="#000"
            fontSize="25px"
            css={`
              margin-top: 10px;
              margin-left: 20px;
            `}
            onClick={() => this.setState({ countdown: 0 })}
          />
        </div>
        <div
          css={`
            margin: 0px auto 0 auto;
            text-align: center;
          `}
        >
          <img
            css={css`
              width: auto;
              height: 50px;
            `}
            src={require("../assets/carbon8WordmarkLogoBlack.png")}
          />
        </div>
      </div>
    );
  }

  renderInstructionText() {
    return (
      <div
        css={css`
          margin: 0 auto;
          width: 520px;
        `}
      >
        <p
          css={css`
            font-size: 18px;
            text-align: center;
          `}
        >
          Please scan your barcode in the place provided.
        </p>
      </div>
    );
  }

  renderScanSpinner() {
    const { scanError, scanSuccess } = this.state;
    const { user } = this.props;

    return (
      <div
        css={css`
          width: ${!scanError ? "230px" : "300px"};
          margin: ${!scanError
            ? scanSuccess && user
              ? "60px auto"
              : "130px auto"
            : "90px auto"};
          text-align: center;
        `}
      >
        {!scanError ? (
          scanSuccess && user ? (
            <div>
              <img src={require("../assets/successCircle.svg")} height={80} />
              <p
                css={css`
                  font-size: 18px;
                `}
              >
                Hey {user.firstName}! {"We're"} so glad you are staying
                hydrated.
              </p>
            </div>
          ) : (
            <div>
              <BarLoader
                width={230}
                sizeUnit={"px"}
                color={"#000"}
                loading={this.state.loader}
              />
              <p
                css={css`
                  font-size: 18px;
                `}
              >
                {this.state.loaderTitle}
              </p>
            </div>
          )
        ) : (
          <div>
            <img src={require("../assets/errorCircle.svg")} height={80} />
            <p
              css={css`
                font-size: 18px;
              `}
            >
              The scan code provided is invalid!
            </p>
          </div>
        )}
      </div>
    );
  }

  renderHiddenInput() {
    return (
      <input
        type="text"
        value={this.state.scanCode}
        onChange={this.handleScanCodeTextInputChange.bind(this)}
        ref={this.scanCodeTextInput}
        disabled={this.state.scanCodeTextInputDisabled}
        css={css`
          opacity: 0;
          :focus {
            outline: none;
          }
        `}
      />
    );
  }

  render() {
    const { toDispense, countdown, scanErrorToOverview } = this.state;
    const { authenticated, serverSocketConnected } = this.props;

    if (countdown === 0 || scanErrorToOverview) {
      return <Redirect to="/overview" />;
    }
    if (toDispense && authenticated && serverSocketConnected) {
      return <Redirect to="/dispense" />;
    }

    return (
      <div>
        {this.renderLogoHeader()}
        {this.renderInstructionText()}
        {this.renderScanSpinner()}
        {this.renderHiddenInput()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    user: getUser(state),
    authenticated: getAuthenticated(state),
    serverSocketConnected: getServerSocketConnected(state)
  };
}

export default connect(
  mapStateToProps,
  {
    setUser,
    authenticate,
    triggerServerConnection
  }
)(ScanCode);
