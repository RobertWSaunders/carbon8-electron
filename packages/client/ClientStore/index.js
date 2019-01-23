import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createSocketMiddleware } from "./ClientSocketMiddleware";
import { reducer, reducerMount } from "./ClientReducer";

const IS_PROD = process.env.NODE_ENV === "production";

export function getStore() {
  const socketMiddleware = createSocketMiddleware();

  const store = createStore(
    combineReducers({
      [reducerMount]: reducer
    }),
    compose(
      applyMiddleware(socketMiddleware),
      !IS_PROD && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );

  return store;
}

export * from "./ClientActions";
export * from "./ClientReducer";
