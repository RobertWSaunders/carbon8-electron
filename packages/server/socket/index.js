// const Gpio = require("onoff").Gpio;

// const flatWaterSolenoid = new Gpio(18, "out");
// const sparklingWaterSolenoid = new Gpio(23, "out");

const socketEvents = {
  SOCKET_CONNECTION: "connection",
  SOCKET_DISCONNECT: "disconnect",
  SOCKET_DISCONNECTING: "disconnecting",
  SOCKET_ERROR: "error",

  SPARKLING_WATER_ON: "SPARKLING_WATER_ON",
  SPARKLING_WATER_OFF: "SPARKLING_WATER_OFF",

  FLAT_WATER_ON: "FLAT_WATER_ON",
  FLAT_WATER_OFF: "FLAT_WATER_OFF"
};

const socketActions = {
  TURN_ON_SPARKLING_WATER: "TURN_ON_SPARKLING_WATER",
  TURN_OFF_SPARKLING_WATER: "TURN_OFF_SPARKLING_WATER",

  TURN_ON_FLAT_WATER: "TURN_ON_FLAT_WATER",
  TURN_OFF_FLAT_WATER: "TURN_OFF_FLAT_WATER"
};

module.exports = (io, logger) => {
  // Connection Logic

  io.on(socketEvents.SOCKET_CONNECTION, (socket) => {
    logger.info(
      `A new socket with the identifier ${socket.id} has been connected!`
    );

    socket.on(socketEvents.SOCKET_DISCONNECT, (reason) => {
      logger.warn(
        `The socket with the identifier ${socket.id} has been disconnected!`
      );
    });

    // Socket Action Handlers

    socket.on(socketActions.TURN_ON_SPARKLING_WATER, () => {
      // sparklingWaterSolenoid.writeSync(1);

      socket.send({
        type: socketEvents.SPARKLING_WATER_ON
      });
    });

    socket.on(socketActions.TURN_OFF_SPARKLING_WATER, () => {
      // sparklingWaterSolenoid.writeSync(0);

      socket.send({
        type: socketEvents.SPARKLING_WATER_OFF
      });
    });

    socket.on(socketActions.TURN_ON_FLAT_WATER, () => {
      // flatWaterSolenoid.writeSync(1);

      socket.send({
        type: socketEvents.FLAT_WATER_ON
      });
    });

    socket.on(socketActions.TURN_OFF_FLAT_WATER, () => {
      // flatWaterSolenoid.writeSync(0);

      socket.send({
        type: socketEvents.FLAT_WATER_OFF
      });
    });
  });
};
