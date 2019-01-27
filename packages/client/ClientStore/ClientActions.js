const clientActionTypes = {};

const serverSocketMiddlewareActionTypes = {
  SERVER_SOCKET_CONNECTED: "@@/client/server/internal/SERVER_SOCKET_CONNECTED",
  SERVER_SOCKET_DISCONNECTED:
    "@@/client/server/internal/SERVER_SOCKET_DISCONNECTED",

  // Actions

  AUTHENTICATE_FOUNTAIN: "@@/client/server/socket/AUTHENTICATE_FOUNTAIN",

  TEST_EMIT: "@@/client/server/socket/TEST_EMIT",

  // Events

  SOCKET_TEST: "@@/client/server/internal/SOCKET_TEST"
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

  TURN_ON_FLAT_WATER: "@@/client/hardware/socket/TURN_ON_FLAT_WATER",
  TURN_OFF_FLAT_WATER: "@@/client/hardware/socket/TURN_OFF_FLAT_WATER",
  TURN_ON_SPARKLING_WATER: "@@/client/hardware/socket/TURN_ON_SPARKLING_WATER",
  TURN_OFF_SPARKING_WATER: "@@/client/hardware/socket/TURN_OFF_SPARKING_WATER",

  // Events

  FLAT_WATER_ON: "@@/client/hardware/internal/SPARKING_WATER_ON",
  FLAT_WATER_OFF: "@@/client/hardware/internal/SPARKING_WATER_OFF",
  SPARKLING_WATER_ON: "@@/client/hardware/internal/SPARKING_WATER_ON",
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

const clientActionCreators = {};

const invokeServerSocketActionCreators = {
  fireTest: () => ({ type: actionTypes.TEST_EMIT })
};

const invokeHardwareSocketActionCreators = {
  turnOnFlatWater: () => ({ type: actionTypes.TURN_ON_FLAT_WATER }),
  turnOffFlatWater: () => ({ type: actionTypes.TURN_OFF_FLAT_WATER }),
  turnOnSparklingWater: () => ({ type: actionTypes.TURN_ON_SPARKLING_WATER }),
  turnOffSparklingWater: () => ({ type: actionTypes.TURN_OFF_SPARKING_WATER })
};

export const actionCreators = {
  ...clientActionCreators,
  ...invokeServerSocketActionCreators,
  ...invokeHardwareSocketActionCreators
};
