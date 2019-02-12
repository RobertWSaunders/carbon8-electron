import { actionTypes } from "./ClientActions";

export const reducerMount = "client";

const initialState = {
  authenticated: false,

  user: null,

  serverSocketConnected: false,
  hardwareSocketConnected: false,

  flatWaterStatus: false,
  sparklingWaterStatus: false
};

export const selectors = {
  getAuthenticated: (state) => state[reducerMount].authenticated,

  getUser: (state) => state[reducerMount].user,

  getServerSocketConnected: (state) =>
    state[reducerMount].serverSocketConnected,
  getHardwareSocketConnected: (state) =>
    state[reducerMount].hardwareSocketConnected,

  getFlatWaterStatus: (state) => state[reducerMount].flatWaterStatus,
  getSparklingWaterStatus: (state) => state[reducerMount].sparklingWaterStatus,

  getTest: (state) => state[reducerMount].test
};

const handlers = {
  [actionTypes.SET_USER]: (state, action) => {
    const { user } = action.data;

    return {
      ...state,
      user
    };
  },
  [actionTypes.AUTHENTICATE]: (state, action) => {
    const { user } = action.data.authInfo;

    return {
      ...state,
      user,
      authenticated: true
    };
  },
  [actionTypes.UNAUTHENTICATE]: (state) => {
    return {
      ...initialState
    };
  },
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
  [actionTypes.SPARKLING_WATER_ON]: (state) => {
    return {
      ...state,
      sparklingWaterStatus: true
    };
  },
  [actionTypes.SPARKLING_WATER_OFF]: (state) => {
    return {
      ...state,
      sparklingWaterStatus: false
    };
  },
  [actionTypes.FLAT_WATER_ON]: (state) => {
    return {
      ...state,
      flatWaterStatus: true
    };
  },
  [actionTypes.FLAT_WATER_OFF]: (state) => {
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
