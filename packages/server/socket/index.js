// const Gpio = require("onoff").Gpio;

// const flatWaterSolenoid = new Gpio(23, "out");
// const sparklingWaterSolenoid = new Gpio(18, "out");

const socketEvents = {
  SOCKET_CONNECTION: "connection",
  SOCKET_DISCONNECT: "disconnect",
  SOCKET_DISCONNECTING: "disconnecting",
  SOCKET_ERROR: "error",

  // To Fountain

  SPARKLING_WATER_ON: "SPARKLING_WATER_ON",
  SPARKLING_WATER_OFF: "SPARKLING_WATER_OFF",

  FLAT_WATER_ON: "FLAT_WATER_ON",
  FLAT_WATER_OFF: "FLAT_WATER_OFF",

  FOUNTAIN_BARCODE_SCANNER_READY: "FOUNTAIN_BARCODE_SCANNER_READY",
  FOUNTAIN_BARCODE_SCAN_COMPLETE: "FOUNTAIN_BARCODE_SCAN_COMPLETE",

  // To Python Barcode Scanner

  ACTIVATE_BARCODE_SCANNER: "ACTIVATE_BARCODE_SCANNER",
  DEACTIVATE_BARCODE_SCANNER: "DEACTIVATE_BARCODE_SCANNER"
};

const socketActions = {
  // From Fountain

  TURN_ON_SPARKLING_WATER: "TURN_ON_SPARKLING_WATER",
  TURN_OFF_SPARKLING_WATER: "TURN_OFF_SPARKLING_WATER",

  TURN_ON_FLAT_WATER: "TURN_ON_FLAT_WATER",
  TURN_OFF_FLAT_WATER: "TURN_OFF_FLAT_WATER",

  ACTIVATE_BARCODE_SCANNER: "ACTIVATE_BARCODE_SCANNER",
  DEACTIVATE_BARCODE_SCANNER: "DEACTIVATE_BARCODE_SCANNER",

  // From Python Barcode Scanner

  BARCODE_SCANNER_READY: "BARCODE_SCANNER_READY",
  BARCODE_SCAN_COMPLETE: "BARCODE_SCAN_COMPLETE"
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

    // From Fountain

    socket.on(socketActions.ACTIVATE_BARCODE_SCANNER, () => {
      console.log("Activating barcode scanner!");
      socket.broadcast.emit(socketEvents.ACTIVATE_BARCODE_SCANNER);
    });

    socket.on(socketActions.DEACTIVATE_BARCODE_SCANNER, () => {
      console.log("Deactivating barcode scanner!");
      socket.broadcast.emit(socketEvents.DEACTIVATE_BARCODE_SCANNER);
    });

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

    // From Python Barcode Scanner

    socket.on(socketActions.BARCODE_SCANNER_READY, () => {
      console.log("Barcode scanner is ready!");

      socket.broadcast.send({
        type: socketEvents.FOUNTAIN_BARCODE_SCANNER_READY
      });
    });

    socket.on(socketActions.BARCODE_SCAN_COMPLETE, (scanCode) => {
      console.log("Barcode scan complete!");

      socket.broadcast.send({
        type: socketEvents.FOUNTAIN_BARCODE_SCAN_COMPLETE,
        data: {
          scanCode
        }
      });
    });
  });
};
