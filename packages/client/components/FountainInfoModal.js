import MdClose from "react-ionicons/lib/MdClose";
import React, { Component } from "react";
import { css } from "@emotion/core";
import Modal from "react-modal";

class FountainInfoModal extends Component {
  render() {
    const { modalOpen, handleModalClose, fountainInfo } = this.props;

    return (
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleModalClose}
        ariaHideApp={false}
      >
        <div
          css={css`
            width: 100%;
            height: 25px;
          `}
        >
          <div
            css={`
              float: right;
              width: 200px;
              text-align: right;
              height: 25px;
            `}
          >
            <MdClose color="#000" fontSize="25px" onClick={handleModalClose} />
          </div>
          <div
            css={`
              float: left;
              width: 200px;
              height: 25px;
            `}
          />
          <div
            css={`
              margin: 0px auto 0 auto;
              text-align: center;
            `}
          >
            <h1
              css={css`
                font-family: "Open Sans", sans-serif !important;
                font-size: 16px;
                padding-right: 5px;
                padding-left: 5px;
                text-align: center;
              `}
            >
              Fountain Information
            </h1>
          </div>
          <div
            css={css`
              margin-top: 30px;
              font-family: "Open Sans", sans-serif !important;
            `}
          >
            <ul>
              <li>Identifier: {fountainInfo ? fountainInfo.id : null}</li>
              <li>Name: {fountainInfo ? fountainInfo.name : null}</li>
              <li>
                Location Latitude:{" "}
                {fountainInfo ? fountainInfo.locationLatitude : null}
              </li>
              <li>
                Location Longitude:{" "}
                {fountainInfo ? fountainInfo.locationLongitude : null}
              </li>
              <li>
                Sparkling Water Supported:{" "}
                {fountainInfo
                  ? JSON.stringify(fountainInfo.sparklingSupported)
                  : null}
              </li>
              <li>
                Needs Maintenance:{" "}
                {fountainInfo
                  ? JSON.stringify(fountainInfo.needsMaintenance)
                  : null}
              </li>
            </ul>
          </div>
        </div>

        <hr
          css={css`
            border-color: #000;
            border-style: solid;
            border-width: 0.5px;
          `}
        />
      </Modal>
    );
  }
}

export default FountainInfoModal;
