var TiBar, label, scanButton, win;
TiBar = require('tibar');
win = Ti.UI.currentWindow;
label = Ti.UI.createLabel({
  color: '#999',
  text: 'this is scan windows.',
  font: {
    fontSize: 20,
    fontFamily: 'Helvetica Neue'
  },
  textAlign: 'center',
  top: 10,
  height: 30
});
win.add(label);
scanButton = Ti.UI.createButton({
  title: 'Scan It',
  top: 80,
  left: 10,
  width: 300,
  height: 100
});
win.add(scanButton);
scanButton.addEventListener('click', function() {
  return TiBar.scan({
    configure: {
      classType: "ZBarReaderViewController",
      sourceType: "Camera",
      cameraMode: "Default",
      config: {
        "showsCameraControls": true,
        "showsZBarControls": true,
        "tracksSymbols": true,
        "enableCache": true,
        "showsHelpOnFail": true,
        "takesPicture": false
      },
      custom: {
        "scanCrop": '',
        "CFG_X_DENSITY": '',
        "CFG_Y_DENSITY": '',
        "continuous": ''
      },
      symbol: {
        "QR-Code": true,
        "CODE-128": false,
        "CODE-39": false,
        "I25": false,
        "DataBar": false,
        "DataBar-Exp": false,
        "EAN-13": false,
        "EAN-8": false,
        "UPC-A": false,
        "UPC-E": false,
        "ISBN-13": false,
        "ISBN-10": false,
        "PDF417": false
      }
    },
    success: function(data) {
      Ti.API.info('TiBar success callback!');
      if (data && data.barcode) {
        return Ti.UI.createAlertDialog({
          title: "Scan Result",
          message: "Barcode: " + data.barcode + 'Symbology:' + data.symbology
        }).show();
      }
    },
    cancel: function() {
      return Ti.API.info("TiBar cancel callback!");
    },
    error: function() {
      return Ti.API.info("TiBar error callback!");
    }
  });
});