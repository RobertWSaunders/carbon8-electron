const Gpio = require("onoff").Gpio;

const flatWaterSolenoid = new Gpio(18, "out");
const sparklingWaterSolenoid = new Gpio(23, "out");

// Events emitted from this local server
const socketEvents = {
  SOCKET_CONNECTION: "connection",
  SOCKET_DISCONNECT: "disconnect",
  SOCKET_DISCONNECTING: "disconnecting",
  SOCKET_ERROR: "error"
};

// Events coming from fountain UI
const socketActions = {
  TURN_ON_LED: "TURN_ON_LED",
  TURN_OFF_LED: "TURN_OFF_LED"
};

module.exports = (io, logger) => {
  io.on(socketEvents.SOCKET_CONNECTION, (socket) => {
    logger.info("A socket has been connected!");

    socket.on(socketEvents.SOCKET_ERROR, (error) => {
      logger.error("There has been a socket error!");
    });

    socket.on(socketEvents.SOCKET_DISCONNECT, (reason) => {
      logger.warn("The socket has been disconnected!");
    });

    socket.on(socketEvents.SOCKET_DISCONNECTING, (reason) => {
      logger.warn("The socket is disconnecting!");
    });

    // Socket Action Handlers

    socket.on(socketActions.TURN_ON_LED, (event) => {
      logger.info(
        "We have received a request to turn the light on from the client!",
        event
      );

      // turn the light on
      led.writeSync(1);
    });

    socket.on(socketActions.TURN_OFF_LED, (event) => {
      logger.info(
        "We have received a request to turn the light off from the client!",
        event
      );

      // turn the light off
      led.writeSync(0);
    });
  });
};
