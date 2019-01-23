import { actionTypes } from "./ClientActions";

export const reducerMount = "client";

const initialState = {
  socketConnected: false,

  ledStatus: false
};

export const selectors = {
  getSocketConnected: (state) => state[reducerMount].socketConnected,
  getLedStatus: (state) => state[reducerMount].ledStatus
};

const handlers = {
  [actionTypes.TURN_ON_LED]: (state, action) => {
    return {
      ...state,
      ledStatus: true
    };
  },
  [actionTypes.TURN_OFF_LED]: (state, action) => {
    return {
      ...state,
      ledStatus: false
    };
  }
};

export function reducer(state = initialState, action) {
  if (handlers[action.type]) return handlers[action.type](state, action);

  return state;
}
