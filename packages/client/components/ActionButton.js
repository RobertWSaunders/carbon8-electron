import { Link } from "react-router-dom";
import React from "react";

import { boxShadow, subtleBoxShadow } from "../assets/constants";

const ActionButton = (props) => {
  const roundPadding = props.inline ? "24px" : "55px";

  const roundedStyles = `
    border-radius: 28px;
    padding: 0 ${roundPadding};
  `;

  const rectStyles = `
    border-radius: 4px;
    border: none;
    padding: 0 25px;
  `;

  const height = props.inline ? "32px" : "42px";

  let commonStyles = `
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
    color: #000 !important;
    background-color: #FFF;
    border: 1px solid #000;
    box-shadow: ${subtleBoxShadow};
    transition: 0.25s ease;
    font-weight: 600;
  `;

  // //:hover {
  //     background-color: ${getHoverBackgroundColor()};
  //     border: ${getHoverBorder()};
  //     box-shadow: ${boxShadow};
  //   }
  //   :active {
  //     background-color: ${getClickBackgroundColor()};
  //     border: ${getHoverBorder()};
  //   }
  //   :disabled {
  //     background-color: ${getDisabledBackgroundColor()};
  //     border: ${getDisabledBorder()};
  //     color: ${getDisabledForegroundColor()} !important;
  //     box-shadow: none;
  //     cursor: default;
  //   }

  switch (props.type) {
    case "rounded":
      commonStyles = `
      ${roundedStyles}
      ${commonStyles}
      ${props.style || ""}
      `;
      break;
    default:
      commonStyles = `
      ${rectStyles}
      ${commonStyles}
      ${props.style || ""}
      `;
      break;
  }

  return props.link ? (
    <Link
      css={`
        ${commonStyles} display: inline-block;
        boxsizing: content-box;
        text-decoration: none !important;
      `}
      disabled={props.disabled}
      onClick={props.onClick}
      to={props.link}
      rel={null}
      target={null}
      className={props.className || "actionButton"}
    >
      <div
        css={`
          height: ${height};
          line-height: ${height};
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
      className={props.className || "actionButton"}
      type="button"
    >
      <div
        css={`
          height: ${height};
          line-height: ${height};
        `}
      >
        {props.children}
      </div>
    </button>
  );
};

export default ActionButton;
