# Carbon8 Barcode Scanner Socket Client

from imutils.video import VideoStream
from pyzbar import pyzbar
import socketio
import datetime
import imutils
import time

# create socketio client
sio = socketio.Client(logger=True, engineio_logger=True)

global vs

def deactivateScanner():
  global vs
  vs.stop()

# socket connection handler
@sio.on('connect')
def on_connect():
  print('[INFO] Socket has been connected to the local hardware server.')

# scan barcode event handler
@sio.on('ACTIVATE_BARCODE_SCANNER')
def on_message():
  print("[INFO] Activating the barcode scanner.")

  global vs
  # start video stream on rpi camera module
  vs = VideoStream(usePiCamera=True).start()
  # sleep to wait for boot up
  time.sleep(2.0)

  sio.emit('BARCODE_SCANNER_READY')

  active = True
  while active:
    frame = vs.read()
    frame = imutils.resize(frame, width=400)

    barcodes = pyzbar.decode(frame)

    for barcode in barcodes:
      barcodeData = barcode.data.decode("utf-8")

      if barcodeData:
        print("[INFO] Found barcode with the value: {}".format(barcodeData))
        sio.emit('BARCODE_SCAN_COMPLETE', barcodeData)
        deactivateScanner()
        active = False

# scan barcode event handler
@sio.on('DEACTIVATE_BARCODE_SCANNER')
def on_message():
  print("[INFO] Deactivating the barcode scanner.")
  deactivateScanner()

@sio.on('disconnect')
def on_disconnect():
  print('Socket has been disconnected from the local hardware server!')
  deactivateScanner()

if __name__ == '__main__':
  print('[INFO] Creating socket connection to the local hardware server.')
  # connect to the local hardware socket server
  sio.connect('http://localhost:3000', transports=['websocket'], socketio_path='/socket')
  sio.wait()
