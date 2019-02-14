import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
import React, { Fragment } from "react";

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
    {props.loading ? (
      <div
        css={css`
          width: 200px;
          text-align: center;
          margin-top: 22px;
        `}
      >
        <BeatLoader sizeUnit={"px"} color={"#000"} loading={props.loading} />
      </div>
    ) : (
      <p
        css={css`
          font-size: 18px;
          text-align: center;
        `}
      >
        {props.statNumber}
      </p>
    )}
  </div>
);
