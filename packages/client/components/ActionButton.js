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
    :active {
      color: #fff;
      background-color: #000;
      box-shadow: ${boxShadow};
    }
    :disabled {
      border-width: 0;
      background-color: rgba(0, 0, 0, 0.3);
      color: rgba(0, 0, 0, 0.6);
      box-shadow: none;
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
      onClick={!props.disabled ? props.onClick : null}
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
      onClick={props.disabled ? props.onClick : null}
      onMouseDown={!props.disabled ? props.onMouseDown : null}
      onMouseUp={!props.disabled ? props.onMouseUp : null}
      onTouchStart={!props.disabled ? props.onTouchStart : null}
      onTouchEnd={!props.disabled ? props.onTouchEnd : null}
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
