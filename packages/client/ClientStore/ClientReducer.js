import { actionTypes } from "./ClientActions";

export const reducerMount = "client";

const initialState = {
  serverSocketConnected: false,
  hardwareSocketConnected: false,

  flatWaterStatus: false,
  sparklingWaterStatus: false
};

export const selectors = {
  getServerSocketConnected: (state) =>
    state[reducerMount].serverSocketConnected,
  getHardwareSocketConnected: (state) =>
    state[reducerMount].hardwareSocketConnected,

  getFlatWaterStatus: (state) => state[reducerMount].flatWaterStatus,
  getSparklingWaterStatus: (state) => state[reducerMount].sparklingWaterStatus
};

const handlers = {
  [actionTypes.TURN_ON_SPARKLING_WATER]: (state) => {
    return {
      ...state,
      sparklingWaterStatus: true
    };
  },
  [actionTypes.TURN_OFF_SPARKLING_WATER]: (state) => {
    return {
      ...state,
      sparklingWaterStatus: false
    };
  },
  [actionTypes.TURN_ON_FLAT_WATER]: (state) => {
    return {
      ...state,
      flatWaterStatus: true
    };
  },
  [actionTypes.TURN_OFF_FLAT_WATER]: (state) => {
    return {
      ...state,
      flatWaterStatus: false
    };
  }
};

export function reducer(state = initialState, action) {
  if (handlers[action.type]) return handlers[action.type](state, action);

  return state;
}
