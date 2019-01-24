const Gpio = require("onoff").Gpio;

const flatWaterSolenoid = new Gpio(18, "out");
const sparklingWaterSolenoid = new Gpio(23, "out");

const socketEvents = {
  SOCKET_CONNECTION: "connection",
  SOCKET_DISCONNECT: "disconnect",
  SOCKET_DISCONNECTING: "disconnecting",
  SOCKET_ERROR: "error"
};

const socketActions = {
  TURN_ON_SPARKLING_WATER: "TURN_ON_SPARKLING_WATER",
  TURN_OFF_SPARKING_WATER: "TURN_OFF_SPARKING_WATER",
  TURN_ON_FLAT_WATER: "TURN_ON_FLAT_WATER",
  TURN_OFF_FLAT_WATER: "TURN_OFF_FLAT_WATER"
};

module.exports = (io, logger) => {
  io.on(socketEvents.SOCKET_CONNECTION, (socket) => {
    logger.info("A socket has been connected!");

    // Socket Event Handlers

    socket.on(socketEvents.SOCKET_DISCONNECT, (reason) => {
      logger.warn("The socket has been disconnected!");
    });

    socket.on(socketEvents.SOCKET_DISCONNECTING, (reason) => {
      logger.warn("The socket is disconnecting!");
    });

    socket.on(socketEvents.SOCKET_ERROR, (error) => {
      logger.error("There has been a socket error!");
    });

    // Socket Action Handlers

    socket.on(socketActions.TURN_ON_SPARKLING_WATER, () => {
      sparklingWaterSolenoid.writeSync(1);
    });

    socket.on(socketActions.TURN_OFF_SPARKING_WATER, () => {
      sparklingWaterSolenoid.writeSync(0);
    });

    socket.on(socketActions.TURN_ON_FLAT_WATER, () => {
      flatWaterSolenoid.writeSync(1);
    });

    socket.on(socketActions.TURN_OFF_FLAT_WATER, () => {
      flatWaterSolenoid.writeSync(0);
    });
  });
};
