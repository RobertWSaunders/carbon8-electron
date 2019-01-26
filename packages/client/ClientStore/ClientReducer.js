import { actionTypes } from "./ClientActions";

export const reducerMount = "client";

const initialState = {
  serverSocketConnected: false,
  hardwareSocketConnected: false,

  flatWaterStatus: false,
  sparklingWaterStatus: false,

  test: ""
};

export const selectors = {
  getServerSocketConnected: (state) =>
    state[reducerMount].serverSocketConnected,
  getHardwareSocketConnected: (state) =>
    state[reducerMount].hardwareSocketConnected,

  getFlatWaterStatus: (state) => state[reducerMount].flatWaterStatus,
  getSparklingWaterStatus: (state) => state[reducerMount].sparklingWaterStatus,

  getTest: (state) => state[reducerMount].test
};

const handlers = {
  [actionTypes.SERVER_SOCKET_CONNECTED]: (state) => {
    return {
      ...state,
      serverSocketConnected: true
    };
  },
  [actionTypes.SERVER_SOCKET_DISCONNECTED]: (state) => {
    return {
      ...state,
      serverSocketConnected: false
    };
  },
  [actionTypes.HARDWARE_SOCKET_CONNECTED]: (state) => {
    return {
      ...state,
      hardwareSocketConnected: true
    };
  },
  [actionTypes.HARDWARE_SOCKET_DISCONNECTED]: (state) => {
    return {
      ...state,
      hardwareSocketConnected: false
    };
  },
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
  },
  [actionTypes.SOCKET_TEST]: (state, action) => {
    const { test } = action.data;

    return {
      ...state,
      test
    };
  }
};

export function reducer(state = initialState, action) {
  if (handlers[action.type]) return handlers[action.type](state, action);

  return state;
}
