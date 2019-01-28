import {
  actionTypes,
  serverSocketEventActionMap,
  hardwareSocketEventActionMap
} from "./ClientActions";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSocketMiddleware from "./ClientSocketMiddleware";
import { reducer, reducerMount } from "./ClientReducer";

const IS_PROD = process.env.NODE_ENV === "production";

const HARDWARE_SOCKET_URI =
  process.env.HARDWARE_SOCKET_URI || "http://localhost:3000";
const SERVER_SOCKET_URI =
  process.env.SERVER_SOCKET_URI || "http://localhost:3001";

export const FOUNTAIN_ACCESS_TOKEN_LOCAL_STORAGE_KEY =
  "CARBON8_FOUNTAIN_ACCESS_TOKEN";

const storageAccess = {
  getValue: (key) => Promise.resolve(localStorage.getItem(key)),
  setValue: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeValue: (key) => Promise.resolve(localStorage.removeItem(key))
};

const hardwareSocketMiddleware = createSocketMiddleware({
  socketUri: HARDWARE_SOCKET_URI,
  middlewareActionRegex: /^@@\/client\/hardware\/socket\/.*/g,
  socketConnectionActionTypes: {
    connected: actionTypes.HARDWARE_SOCKET_CONNECTED,
    disconnected: actionTypes.HARDWARE_SOCKET_DISCONNECTED
  },
  socketEventActionMap: hardwareSocketEventActionMap,
  socketAuthenticateOnConnect: false,
  storageAccess
});

const serverSocketMiddleware = createSocketMiddleware({
  socketUri: SERVER_SOCKET_URI,
  middlewareActionRegex: /^@@\/client\/server\/socket\/.*/g,
  socketConnectionActionTypes: {
    connected: actionTypes.SERVER_SOCKET_CONNECTED,
    disconnected: actionTypes.SERVER_SOCKET_DISCONNECTED
  },
  socketEventActionMap: serverSocketEventActionMap,
  socketAuthenticateOnConnect: true,
  accessTokenKey: FOUNTAIN_ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  socketAuthenticateAction: "AUTHENTICATE_FOUNTAIN",
  storageAccess
});

export function getStore() {
  const store = createStore(
    combineReducers({
      [reducerMount]: reducer
    }),
    compose(
      applyMiddleware(hardwareSocketMiddleware, serverSocketMiddleware),
      !IS_PROD && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );

  return store;
}

export * from "./ClientActions";
export * from "./ClientReducer";
