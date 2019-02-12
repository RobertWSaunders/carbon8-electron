import { css } from "@emotion/core";
import React from "react";
import { throws } from "assert";

export default (props) => (
  <div
    css={css`
      height: 100px;
      width: 200px;
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
      {props.title}
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
      {props.statNumber}
    </p>
  </div>
);
