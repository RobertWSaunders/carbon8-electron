const clientActionTypes = {};

const socketMiddlewareActionTypes = {
  SERVER_SOCKET_CONNECTED: "@@/client/SERVER_SOCKET_CONNECTED",
  SERVER_SOCKET_DISCONNECTED: "@@/client/SERVER_SOCKET_DISCONNECTED"
};

const hardwareSocketMiddlwareActionTypes = {
  HARDWARE_SOCKET_CONNECTED: "@@/client/HARDWARE_SOCKET_CONNECTED",
  HARDWARE_SOCKET_DISCONNECTED: "@@/client/HARDWARE_SOCKET_DISCONNECTED",

  TURN_ON_FLAT_WATER: "@@/client/hardware/socket/TURN_ON_FLAT_WATER",
  TURN_OFF_FLAT_WATER: "@@/client/hardware/socket/TURN_OFF_FLAT_WATER",
  TURN_ON_SPARKLING_WATER: "@@/client/hardware/socket/TURN_ON_SPARKLING_WATER",
  TURN_OFF_SPARKING_WATER: "@@/client/hardware/socket/TURN_OFF_SPARKING_WATER"
};

export const actionTypes = {
  ...clientActionTypes,
  ...socketMiddlewareActionTypes,
  ...hardwareSocketMiddlwareActionTypes
};

const clientActionCreators = {};

const invokeSocketActionCreators = {};

const invokeHardwareSocketActionCreators = {
  turnOnFlatWater: () => ({ type: actionTypes.TURN_ON_FLAT_WATER }),
  turnOffFlatWater: () => ({ type: actionTypes.TURN_OFF_FLAT_WATER }),
  turnOnSparklingWater: () => ({ type: actionTypes.TURN_ON_SPARKLING_WATER }),
  turnOffSparklingWater: () => ({ type: actionTypes.TURN_OFF_SPARKING_WATER })
};

export const actionCreators = {
  ...clientActionCreators,
  ...invokeSocketActionCreators,
  ...invokeHardwareSocketActionCreators
};
