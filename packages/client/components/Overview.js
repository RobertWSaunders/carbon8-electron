import IosSettings from "react-ionicons/lib/IosSettings";
import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "@emotion/core";

import FountainStatisticCard from "./FountainStatisticCard";
import { selectors, actionCreators } from "../ClientStore";
import FountainInfoModal from "./FountainInfoModal";
import ActionButton from "./ActionButton";

const {
  turnOnFlatWater,
  turnOffFlatWater,
  unauthenticate,
  triggerServerDisconnection
} = actionCreators;
const { getFlatWaterStatus } = selectors;

class Overview extends Component {
  constructor() {
    super();

    this.state = {
      fountainInfoModalOpen: false
    };
  }

  async componentDidMount() {
    await localStorage.removeItem(
      process.env.FOUNTAIN_ACCESS_TOKEN_LOCAL_STORAGE_KEY
    );

    this.props.unauthenticate();

    this.props.triggerServerDisconnection();
  }

  openFountainInfoModal() {
    this.setState({ fountainInfoModalOpen: true });
  }

  closeFountainInfoModal() {
    this.setState({ fountainInfoModalOpen: false });
  }

  handleFlatWaterDown(e) {
    this.props.turnOnFlatWater();
  }

  handleFlatWaterUp(e) {
    this.props.turnOffFlatWater();
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
        >
          <IosSettings
            color="#000"
            fontSize="25px"
            css={`
              margin-top: 10px;
              margin-right: 20px;
            `}
            onClick={this.openFountainInfoModal.bind(this)}
          />
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
          Enjoy flat water or scan your barcode to access sparkling water and to
          track your consumption in the app.
        </p>
      </div>
    );
  }

  renderButtons() {
    return (
      <div
        css={`
          text-align: center;
          margin-bottom: 30px;
          margin-top: 42px;
        `}
      >
        <ActionButton
          style="margin-right: 90px;"
          onMouseDown={this.handleFlatWaterDown.bind(this)}
          onMouseUp={this.handleFlatWaterUp.bind(this)}
        >
          Flat Water
        </ActionButton>
        <ActionButton link="/scan-code">Scan Code</ActionButton>
      </div>
    );
  }

  renderFountainStatistics() {
    return (
      <div
        css={css`
          bottom: 0;
          position: absolute;
          width: 100%;
        `}
      >
        <hr
          css={css`
            line-height: 1px;
            position: relative;
            outline: 0;
            border: 0;
            color: #000;
            text-align: center;
            height: 1.5em;
            margin: 25px 50px 25px 50px;
            &:before {
              content: "";
              background: #000;
              position: absolute;
              left: 0;
              top: 50%;
              width: 100%;
              height: 1px;
            }
            &:after {
              content: attr(data-content);
              position: relative;
              font-size: 16px;
              display: inline-block;
              padding: 0 20px;
              line-height: 1.5em;
              color: #000;
              background-color: #fff;
            }
          `}
          data-content="Fountain Statistics"
        />
        <div
          css={css`
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            justify-content: center;
          `}
        >
          <FountainStatisticCard
            title={"Flat Water Dispensed"}
            statNumber={"1.83 L"}
          />
          <FountainStatisticCard
            title={"Plastic Bottles Saved"}
            statNumber={"18390"}
          />
          <FountainStatisticCard
            title={"Sparkling Water Dispensed"}
            statNumber={"1.29 L"}
          />
        </div>
      </div>
    );
  }

  renderFountainInfoModal() {
    const { fountainInfoModalOpen } = this.state;

    return (
      <FountainInfoModal
        modalOpen={fountainInfoModalOpen}
        handleModalClose={this.closeFountainInfoModal.bind(this)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderLogoHeader()}
        {this.renderInstructionText()}
        {this.renderButtons()}
        {this.renderFountainStatistics()}
        {this.renderFountainInfoModal()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    flatWaterStatus: getFlatWaterStatus(state)
  };
}

export default connect(
  mapStateToProps,
  {
    turnOnFlatWater,
    turnOffFlatWater,
    unauthenticate,
    triggerServerDisconnection
  }
)(Overview);
