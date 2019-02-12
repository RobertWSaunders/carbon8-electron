const clientActionTypes = {
  AUTHENTICATE: "@@/client/AUTHENTICATE",
  UNAUTHENTICATE: "@@/client/UNAUTHENTICATE",

  SET_USER: "@@/client/SET_USER"
};

const serverSocketMiddlewareActionTypes = {
  SERVER_SOCKET_CONNECTED: "@@/client/server/internal/SERVER_SOCKET_CONNECTED",
  SERVER_SOCKET_DISCONNECTED:
    "@@/client/server/internal/SERVER_SOCKET_DISCONNECTED",

  // Actions

  TRIGGER_SERVER_CONNECTION:
    "@@/client/server/socket/TRIGGER_SERVER_CONNECTION",
  TRIGGER_SERVER_DISCONNECTION:
    "@@/client/server/socket/TRIGGER_SERVER_DISCONNECTION",

  AUTHENTICATE_FOUNTAIN: "@@/client/server/socket/AUTHENTICATE_FOUNTAIN",

  TEST_EMIT_MOBILE: "@@/client/server/socket/TEST_EMIT_MOBILE"

  // Events
};

export const serverSocketEventActionMap = {
  ["TEST"]: serverSocketMiddlewareActionTypes.SOCKET_TEST
};

const hardwareSocketMiddlwareActionTypes = {
  HARDWARE_SOCKET_CONNECTED:
    "@@/client/hardware/internal/HARDWARE_SOCKET_CONNECTED",
  HARDWARE_SOCKET_DISCONNECTED:
    "@@/client/hardware/internal/HARDWARE_SOCKET_DISCONNECTED",

  // Actions

  TRIGGER_HARDWARE_CONNECTION:
    "@@/client/hardware/socket/TRIGGER_HARDWARE_CONNECTION",
  TRIGGER_HARDWARE_DISCONNECTION:
    "@@/client/hardware/socket/TRIGGER_HARDWARE_DISCONNECTION",

  TURN_ON_FLAT_WATER: "@@/client/hardware/socket/TURN_ON_FLAT_WATER",
  TURN_OFF_FLAT_WATER: "@@/client/hardware/socket/TURN_OFF_FLAT_WATER",
  TURN_ON_SPARKLING_WATER: "@@/client/hardware/socket/TURN_ON_SPARKLING_WATER",
  TURN_OFF_SPARKLING_WATER:
    "@@/client/hardware/socket/TURN_OFF_SPARKLING_WATER",

  // Events

  FLAT_WATER_ON: "@@/client/hardware/internal/FLAT_WATER_ON",
  FLAT_WATER_OFF: "@@/client/hardware/internal/FLAT_WATER_OFF",
  SPARKLING_WATER_ON: "@@/client/hardware/internal/SPARKLING_WATER_ON",
  SPARKLING_WATER_OFF: "@@/client/hardware/internal/SPARKLING_WATER_OFF"
};

export const hardwareSocketEventActionMap = {
  ["FLAT_WATER_ON"]: hardwareSocketMiddlwareActionTypes.FLAT_WATER_ON,
  ["FLAT_WATER_OFF"]: hardwareSocketMiddlwareActionTypes.FLAT_WATER_OFF,
  ["SPARKLING_WATER_ON"]: hardwareSocketMiddlwareActionTypes.SPARKLING_WATER_ON,
  ["SPARKLING_WATER_OFF"]:
    hardwareSocketMiddlwareActionTypes.SPARKLING_WATER_OFF
};

export const actionTypes = {
  ...clientActionTypes,
  ...serverSocketMiddlewareActionTypes,
  ...hardwareSocketMiddlwareActionTypes
};

const clientActionCreators = {
  authenticate: (authInfo) => ({
    type: actionTypes.AUTHENTICATE,
    data: { authInfo }
  }),
  unauthenticate: () => ({ type: actionTypes.UNAUTHENTICATE }),

  setUser: (user) => ({ type: actionTypes.SET_USER, data: { user } })
};

const invokeServerSocketActionCreators = {
  triggerServerConnection: () => ({
    type: actionTypes.TRIGGER_SERVER_CONNECTION
  }),
  triggerServerDisconnection: () => ({
    type: actionTypes.TRIGGER_SERVER_DISCONNECTION
  }),
  testMobileEmit: () => ({
    type: actionTypes.TEST_EMIT_MOBILE
  })
};

const invokeHardwareSocketActionCreators = {
  triggerHardwareConnection: () => ({
    type: actionTypes.TRIGGER_SERVER_CONNECTION
  }),
  triggerHardwareDisconnection: () => ({
    type: actionTypes.TRIGGER_SERVER_DISCONNECTION
  }),

  turnOnFlatWater: () => ({ type: actionTypes.TURN_ON_FLAT_WATER }),
  turnOffFlatWater: () => ({ type: actionTypes.TURN_OFF_FLAT_WATER }),
  turnOnSparklingWater: () => ({ type: actionTypes.TURN_ON_SPARKLING_WATER }),
  turnOffSparklingWater: () => ({ type: actionTypes.TURN_OFF_SPARKLING_WATER })
};

export const actionCreators = {
  ...clientActionCreators,
  ...invokeServerSocketActionCreators,
  ...invokeHardwareSocketActionCreators
};
