import React, { Component } from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";

import ActionButton from "./ActionButton";

class Overview extends Component {
  render() {
    return (
      <div>
        <div
          css={css`
            text-align: center;
          `}
        >
          <img
            css={css`
              margin-top: 20px;
              width: 200px;
            `}
            src={require("../assets/carbon8WordmarkLogoBlack.png")}
          />
        </div>
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
            Enjoy flat water or scan your barcode to access sparkling water and
            to track your consumption in the app.
          </p>
        </div>
        <div
          css={`
            text-align: center;
            margin-bottom: 30px;
            margin-top: 38px;
          `}
        >
          <ActionButton
            style="margin-right: 90px;"
            onClick={() => this.handle()}
          >
            Flat Water
          </ActionButton>
          <ActionButton onClick={() => this.handle()}>Scan Code</ActionButton>
          {/* <ActionButton link="/scan-code">
            Scan Code
          </ActionButton> */}
        </div>
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
            <div
              css={css`
                height: 100px;
                flex: 0 0 220px;
                margin: 0 20px 0 20px;
                border-style: solid;
                border-bottom: 0px;
                border-width: 1px;
                border-color: #000;
              `}
            >
              <h1
                css={css`
                  font-size: 14px;
                  padding-right: 5px;
                  padding-left: 5px;
                  text-align: center;
                `}
              >
                Flat Water Dispensed
              </h1>
              <hr
                css={css`
                  border-color: #000;
                  border-style: solid;
                  border-width: 0.5px;
                `}
              />
              <p
                css={css`
                  font-size: 18px;
                  text-align: center;
                `}
              >
                1.83 L
              </p>
            </div>
            <div
              css={css`
                height: 100px;
                flex: 0 0 220px;
                margin: 0 20px 0 20px;
                border-style: solid;
                border-bottom: 0px;
                border-width: 1px;
                border-color: #000;
              `}
            >
              <h1
                css={css`
                  font-size: 14px;
                  padding-right: 5px;
                  padding-left: 5px;
                  text-align: center;
                `}
              >
                Plastic Bottles Saved
              </h1>
              <hr
                css={css`
                  border-color: #000;
                  border-style: solid;
                  border-width: 0.5px;
                `}
              />
              <p
                css={css`
                  font-size: 18px;
                  text-align: center;
                `}
              >
                8492
              </p>
            </div>
            <div
              css={css`
                height: 100px;
                flex: 0 0 220px;
                margin: 0 20px 0 20px;
                border-style: solid;
                border-bottom: 0px;
                border-width: 1px;
                border-color: #000;
              `}
            >
              <h1
                css={css`
                  font-size: 14px;
                  padding-right: 5px;
                  padding-left: 5px;
                  text-align: center;
                `}
              >
                Sparkling Water Dispensed
              </h1>
              <hr
                css={css`
                  border-color: #000;
                  border-style: solid;
                  border-width: 0.5px;
                `}
              />
              <p
                css={css`
                  font-size: 18px;
                  text-align: center;
                `}
              >
                1.5 L
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
