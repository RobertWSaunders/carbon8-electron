const clientSocketMiddlwareActionTypes = {
  SOCKET_CONNECTED: "@@/client/SOCKET_CONNECTED",
  SOCKET_DISCONNECTED: "@@/client/SOCKET_DISCONNECTED",

  // Local Server Socket Actions

  TURN_ON_LED: "@@/client/hardware/socket/TURN_ON_LED",
  TURN_OFF_LED: "@@/client/hardware/socket/TURN_OFF_LED"
};

const normalTypes = {};

export const actionTypes = {
  ...normalTypes,
  ...clientSocketMiddlwareActionTypes
};

const invokeHardwareSocketActionCreators = {
  turnLedOn: () => ({ type: clientSocketMiddlwareActionTypes.TURN_ON_LED }),
  turnLedOff: () => ({ type: clientSocketMiddlwareActionTypes.TURN_OFF_LED })
};

const invokeSocketActionCreators = {};

const normalActionCreators = {};

export const actionCreators = {
  ...normalActionCreators,
  ...invokeSocketActionCreators,
  ...invokeHardwareSocketActionCreators
};
