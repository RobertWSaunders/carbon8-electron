import io from "socket.io-client";

let store;
let socket;
let socketUri;
let socketActionRegex;
let socketEventActionMap;
let socketConnectionActionTypes;

const buffer = [];

function isSocketMiddlewareAction(action) {
  return action.type.match(socketActionRegex);
}

function getSocketActionFromReduxAction(action) {
  const words = action.type.split("/");

  return words[words.length - 1];
}

function createSocketConnection() {
  socket = io(socketUri, {
    path: "/socket",
    transports: ["websocket"]
  });

  socket.on("connect", () => {
    if (buffer.length > 0) {
      buffer.forEach((action) => {
        socket.emit(getSocketActionFromReduxAction(action));
      });
    }

    store.dispatch({ type: socketConnectionActionTypes.connected });
  });

  socket.on("disconnect", () => {
    store.dispatch({ type: socketConnectionActionTypes.disconnected });
  });

  socket.on("message", (event) => {
    if (event.type && socketEventActionMap[event.type]) {
      store.dispatch({
        type: socketEventActionMap[event.type],
        data: event.data
      });
    }
  });
}

function handleSocketAction(action) {
  if (!socket) {
    buffer.push(action);

    return createSocketConnection();
  }

  socket.emit(getSocketActionFromReduxAction(action));
}

export function createSocketMiddleware(opts) {
  return (storeRef) => {
    store = storeRef;

    socketUri = opts.socketUri;
    socketActionRegex = opts.socketActionRegex;
    socketEventActionMap = opts.socketEventActionMap;
    socketConnectionActionTypes = opts.socketConnectionActionTypes;

    return (next) => (action) => {
      if (isSocketMiddlewareAction(action)) handleSocketAction(action);

      next(action);
    };
  };
}
