import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "@emotion/core";

import { selectors, actionCreators } from "../ClientStore";
import ActionButton from "./ActionButton";

const {
  emitToMobile,
  turnOnFlatWater,
  turnOffFlatWater,
  turnOnSparklingWater,
  turnOffSparklingWater
} = actionCreators;

const { getUser, getFlatWaterStatus, getSparklingWaterStatus } = selectors;

const TIMEOUT_DELAY = 15;

class Dispense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown: TIMEOUT_DELAY,
      showCountdown: true,
      sparklingPressed: false,
      flatPressed: false
    };
  }

  componentDidMount() {
    this.setCountdownInterval();

    this.props.emitToMobile({ type: "SCAN_CODE_COMPLETE", data: {} });
  }

  componentWillUnmount() {
    clearInterval(this.countdownInterval);
  }

  setCountdownInterval() {
    this.setState({
      showCountdown: true
    });

    this.countdownInterval = setInterval(() => {
      this.setState({ countdown: this.state.countdown - 1 });
    }, 1000);
  }

  clearCountdownIntervalAndHide() {
    clearInterval(this.countdownInterval);

    this.setState({
      showCountdown: false,
      countdown: TIMEOUT_DELAY
    });
  }

  handleFlatWaterDown() {
    if (!this.state.sparklingPressed) {
      this.clearCountdownIntervalAndHide();

      this.setState({
        flatPressed: true
      });

      this.props.turnOnFlatWater();

      this.props.emitToMobile({ type: "DISPENSING_WATER_START", data: {} });
    }
  }

  handleFlatWaterUp() {
    this.setCountdownInterval();

    this.setState({
      flatPressed: false
    });

    this.props.turnOffFlatWater();

    this.props.emitToMobile({ type: "DISPENSING_WATER_END", data: {} });
  }

  handleSparklingWaterDown() {
    if (!this.state.flatPressed) {
      this.clearCountdownIntervalAndHide();

      this.setState({
        sparklingPressed: true
      });

      this.props.turnOnSparklingWater();
    }
  }

  handleSparklingWaterUp() {
    this.setCountdownInterval();

    this.setState({
      sparklingPressed: false
    });

    this.props.turnOffSparklingWater();
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
        </div>
        <div
          css={`
            float: left;
            width: 200px;
            height: 50px;
          `}
        />
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
    const { user } = this.props;

    return (
      <div
        css={css`
          margin: 0 auto;
          width: 600px;
        `}
      >
        <p
          css={css`
            font-size: 18px;
            text-align: center;
          `}
        >
          Enjoy that water{user ? ` ${user.firstName}` : null}! Press and hold a
          button below to dispense your water, your consumption will be tracked
          in the app.
        </p>
      </div>
    );
  }

  renderButtons() {
    const { user } = this.props;

    let subscribed = false;

    if (user) {
      subscribed = user.subscribed;
    }

    return (
      <div>
        <div
          css={`
            text-align: center;
            margin-bottom: 30px;
            margin-top: 80px;
          `}
        >
          <ActionButton
            style="margin-right: 90px;"
            onTouchStart={this.handleFlatWaterDown.bind(this)}
            onTouchEnd={this.handleFlatWaterUp.bind(this)}
          >
            Flat Water
          </ActionButton>
          <ActionButton
            onTouchStart={this.handleSparklingWaterDown.bind(this)}
            onTouchEnd={this.handleSparklingWaterUp.bind(this)}
            disabled={!subscribed}
          >
            Sparkling Water
          </ActionButton>
        </div>
        {!subscribed ? (
          <div
            css={`
              text-align: center;
              margin-right: 125px;
              width: 200px;
              float: right;
            `}
          >
            <p>Consider subscribing to access sparkling water!</p>
          </div>
        ) : null}
      </div>
    );
  }

  render() {
    const { countdown } = this.state;

    if (countdown === 0) return <Redirect to="/overview" />;

    return (
      <div>
        {this.renderLogoHeader()}
        {this.renderInstructionText()}
        {this.renderButtons()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    sparklingWaterStatus: getSparklingWaterStatus(state),
    flatWaterStatus: getFlatWaterStatus(state),
    user: getUser(state)
  };
}

export default connect(
  mapStateToProps,
  {
    emitToMobile,
    turnOnFlatWater,
    turnOffFlatWater,
    turnOnSparklingWater,
    turnOffSparklingWater
  }
)(Dispense);
