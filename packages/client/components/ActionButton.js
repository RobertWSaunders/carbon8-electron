import { Link } from "react-router-dom";
import { css } from "@emotion/core";
import React from "react";

import { boxShadow, subtleBoxShadow } from "../assets/constants";

const ActionButton = (props) => {
  const rectStyles = css`
    border-radius: 4px;
    border: none;
    padding: 0 25px;
  `;

  let commonStyles = css`
    box-sizing: content-box;
    height: 100px;
    cursor: pointer;
    width: 200px;
    flex-direction: column;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #000;
    background-color: #fff;
    border: 1px solid #000;
    box-shadow: ${subtleBoxShadow};
    transition: 0.25s ease;
    font-weight: 600;
    :hover {
      color: #fff;
      background-color: #000;
      box-shadow: ${boxShadow};
    }
    :disabled {
      background-color: #eee;
      color: #fff !important;
      box-shadow: none;
      cursor: default;
    }
    :focus {
      outline: 0;
    }
  `;

  commonStyles = css`
    ${rectStyles}
    ${commonStyles}
    ${props.style || ""}
  `;

  return props.link ? (
    <Link
      css={css`
        ${commonStyles}
        display: inline-block;
        boxsizing: content-box;
        text-decoration: none !important;
      `}
      disabled={props.disabled}
      onClick={props.onClick}
      to={props.link}
    >
      <div
        css={css`
          height: 100px;
          line-height: 100px;
        `}
      >
        {props.children}
      </div>
    </Link>
  ) : (
    <button
      css={commonStyles}
      disabled={props.disabled}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      type="button"
    >
      <div
        css={css`
          height: 100px;
          line-height: 100px;
        `}
      >
        {props.children}
      </div>
    </button>
  );
};

export default ActionButton;
