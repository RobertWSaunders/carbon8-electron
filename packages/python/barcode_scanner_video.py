# Carbon8 Barcode Scanner Socket Client

from imutils.video import VideoStream
from pyzbar import pyzbar
import socketio
import datetime
import imutils
import time
import cv2

# create socketio client
sio = socketio.Client()

#vs = VideoStream(usePiCamera=True)

# socket connection handler
@sio.on('connect')
def on_connect():
  print('[INFO] Socket has been connected to the local hardware server.')

# scan barcode event handler
@sio.on('SCAN_BARCODE')
def on_message(data):
  print("[INFO] Starting video stream for barcode scanning.")

  # start video stream on rpi camera module
  vs.start()
  # sleep to wait for boot up
  time.sleep(2.0)

  found = set()

  sio.emit('BARCODE_SCANNER_READY')

  active = True
  while active:
    frame = vs.read()
    frame = imutils.resize(frame, width=400)

    barcodes = pyzbar.decode(frame)

    for barcode in barcodes:
      barcodeData = barcode.data.decode("utf-8")

      if barcodeData not in found:
        print("[INFO] Found barcode with the value: {}".format(barcodeData))
        sio.emit('BARCODE_FOUND', barcodeData)
        found.add(barcodeData)
        active = False

# scan barcode event handler
@sio.on('STOP_SCAN_BARCODE')
def on_message(data):
  print("[INFO] Stopping video stream for barcode scanning.")
  cv2.destroyAllWindows()
  vs.stop()

@sio.on('disconnect')
def on_disconnect():
    print('Socket has been disconnected from the local hardware server!')

if __name__ == '__main__':
  # connect to the local hardware socket server
  sio.connect('http://localhost:3000', {}, ['websocket'], None, 'socket')
  sio.wait()
