import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createSocketMiddleware } from "./ClientSocketMiddleware";
import { reducer, reducerMount } from "./ClientReducer";
import { actionTypes } from "./ClientActions";

const IS_PROD = process.env.NODE_ENV === "production";

export function getStore() {
  const hardwareSocketMiddleware = createSocketMiddleware({
    socketUri: "http://localhost:3000",
    socketActionRegex: /^@@\/client\/hardware\/socket\/.*/g,
    socketConnectionActionTypes: {
      connected: actionTypes.HARDWARE_SOCKET_CONNECTED,
      disconnected: actionTypes.HARDWARE_SOCKET_DISCONNECTED
    },
    socketEventActionMap: {}
  });

  const serverSocketMiddleware = createSocketMiddleware({
    socketUri: "http://localhost:3001",
    socketActionRegex: /^@@\/client\/server\/socket\/.*/g,
    socketConnectionActionTypes: {
      connected: actionTypes.SERVER_SOCKET_CONNECTED,
      disconnected: actionTypes.SERVER_SOCKET_DISCONNECTED
    },
    socketEventActionMap: {}
  });

  const store = createStore(
    combineReducers({
      [reducerMount]: reducer
    }),
    compose(
      applyMiddleware(serverSocketMiddleware, hardwareSocketMiddleware),
      !IS_PROD && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );

  return store;
}

export * from "./ClientActions";
export * from "./ClientReducer";
