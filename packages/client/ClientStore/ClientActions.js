const clientActionTypes = {};

const serverSocketMiddlewareActionTypes = {
  SERVER_SOCKET_CONNECTED: "@@/client/server/internal/SERVER_SOCKET_CONNECTED",
  SERVER_SOCKET_DISCONNECTED:
    "@@/client/server/internal/SERVER_SOCKET_DISCONNECTED",

  // Actions

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
  TURN_OFF_SPARKING_WATER: "@@/client/hardware/socket/TURN_OFF_SPARKING_WATER"
};

export const hardwareSocketEventActionMap = {};

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
