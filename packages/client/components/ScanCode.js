import MdArrowRoundBack from "react-ionicons/lib/MdArrowRoundBack";
import { BarLoader } from "react-spinners";
import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "@emotion/core";
import axios from "axios";

import { actionCreators, selectors } from "../ClientStore";

const { setUser, authenticated, triggerServerConnection } = actionCreators;
const { getUser } = selectors;

class ScanCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scanCode: "",
      toDispense: false,
      waitingScan: true,
      countdown: 30
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ countdown: this.state.countdown - 1 });
    }, 1000);
  }

  handleChange(e) {
    this.setState({ scanCode: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { scanCode } = this.state;

    try {
      const res = await axios.post(
        "http://localhost:3001/auth/sessionFromScanCode",
        {
          scanCode,
          fountainId: "be057b58-3012-4fea-8697-2a22cbf04cc7"
        }
      );

      this.props.authenticated();

      const { user, fountainAccessToken } = res.data;

      await localStorage.setItem(
        process.env.FOUNTAIN_ACCESS_TOKEN_LOCAL_STORAGE_KEY,
        fountainAccessToken
      );

      this.props.setUser(user);

      this.props.triggerServerConnection();

      this.setState({ toDispense: true });
    } catch (err) {
      console.log(err.response);
    }
  }

  renderLogoHeader() {
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
        />
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

  render() {
    const { toDispense, countdown } = this.state;

    if (countdown === 0) return <Redirect to="/overview" />;
    if (toDispense) return <Redirect to="/dispense" />;

    return (
      <div>
        {this.renderLogoHeader()}
        {this.renderInstructionText()}
        <div
          css={css`
            width: 230px;
            margin: 130px auto;
            text-align: center;
          `}
        >
          <BarLoader
            width={230}
            sizeUnit={"px"}
            color={"#000"}
            loading={this.state.waitingScan}
          />
          <p
            css={css`
              font-size: 18px;
            `}
          >
            Waiting for scan...
          </p>
        </div>

        {/* <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Scan Code:</label>&nbsp;
          <input
            type="text"
            value={this.state.scanCode}
            onChange={this.handleChange.bind(this)}
          />
          <input type="submit" value="Submit" />
        </form> */}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    user: getUser(state)
  };
}

export default connect(
  mapStateToProps,
  {
    setUser,
    authenticated,
    triggerServerConnection
  }
)(ScanCode);
