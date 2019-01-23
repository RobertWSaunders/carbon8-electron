import io from "socket.io-client";

import { actionTypes } from "./ClientActions";
import { selectors } from "./ClientReducer";

let ws;
let store;
let options = {};
const buffer = [];

function isSocketMiddlewareAction(action) {
  return action.type.match(/^@@\/client\/hardware\/socket\/.*/g);
}

function getSocketActionFromAction(action) {
  const words = action.type.split("/");

  return words[words.length - 1];
}

function handleAction(action) {
  if (!ws) {
    buffer.push(action);

    ws = io("http://localhost:3000", {
      path: "/socket",
      transports: ["websocket"]
    });

    ws.on("connect", () => {
      if (buffer.length > 0) {
        buffer.forEach((action) => {
          ws.emit(getSocketActionFromAction(action));
        });
      }

      store.dispatch({ type: actionTypes.SOCKET_CONNECTED });
    });

    ws.on("disconnect", () => {
      store.dispatch({ type: actionTypes.SOCKET_DISCONNECTED });
    });
  } else {
    ws.emit(getSocketActionFromAction(action));
  }
}

export function createSocketMiddleware(opt) {
  return (storeRef) => {
    store = storeRef;
    options = opt;

    return (next) => (action) => {
      if (isSocketMiddlewareAction(action)) handleAction(action);

      next(action);
    };
  };
}
