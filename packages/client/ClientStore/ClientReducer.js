import { actionTypes } from "./ClientActions";

export const reducerMount = "client";

const initialState = {
  authenticated: false,

  user: null,

  serverSocketConnected: false,
  hardwareSocketConnected: false,

  flatWaterStatus: false,
  sparklingWaterStatus: false,

  scannerReady: false,
  codeFromScanner: ""
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

  getScannerReady: (state) => state[reducerMount].scannerReady,
  getCodeFromScanner: (state) => state[reducerMount].codeFromScanner,

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
  },
  [actionTypes.FOUNTAIN_BARCODE_SCANNER_READY]: (state) => {
    return {
      ...state,
      scannerReady: true
    };
  },
  [actionTypes.FOUNTAIN_BARCODE_SCAN_COMPLETE]: (state, action) => {
    const { scanCode } = action.data;

    return {
      ...state,
      scannerReady: false,
      codeFromScanner: scanCode
    };
  },
  [actionTypes.SET_CODE]: (state, action) => {
    const { code } = action.data;

    return {
      ...state,
      codeFromScanner: code
    };
  }
};

export function reducer(state = initialState, action) {
  if (handlers[action.type]) return handlers[action.type](state, action);

  return state;
}
