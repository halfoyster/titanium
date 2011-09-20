var createActivityIndicator, createStatusHeader;
createActivityIndicator = function() {
  return Ti.UI.createActivityIndicator({
    height: 'auto',
    width: 'auto',
    style: Ti.UI.iPhone.ActivityIndicatorStyle
  });
};
createStatusHeader = function() {
  var actInd, arrow, border, lastUpdatedLabel, statusHeader, statusLabel;
  statusHeader = Ti.UI.createView({
    backgroundColor: '#e2e7ed',
    height: 55
  });
  border = Ti.UI.createView({
    backgroundColor: '#576c89',
    height: 2,
    bottom: 0
  });
  statusHeader.add(border);
  actInd = createActivityIndicator();
  actInd.left = 15;
  actInd.bottom = 15;
  statusHeader.add(actInd);
  arrow = Ti.UI.createView({
    backgroundImage: 'images/whiteArrow.png',
    width: 23,
    height: 60,
    bottom: 10,
    left: 20
  });
  statusHeader.add(arrow);
  statusLabel = Ti.UI.createLabel({
    text: 'Pull down to refresh...',
    left: 60,
    width: 200,
    bottom: 30,
    height: 'auto',
    color: '#576c89',
    textAlign: 'center',
    font: {
      fontSize: 13,
      fontWeight: 'bold'
    },
    shadowColor: '#999',
    shadowOffset: {
      x: 0,
      y: 1
    }
  });
  statusHeader.add(statusLabel);
  lastUpdatedLabel = Ti.UI.createLabel({
    text: "Last Updated: " + (formatDate()),
    left: 55,
    width: 200,
    bottom: 15,
    height: 'auto',
    color: '#576c89',
    textAlign: 'center',
    font: {
      fontSize: 12
    },
    shadowColor: '#999',
    shadowOffset: {
      x: 0,
      y: 1
    }
  });
  statusHeader.add(lastUpdatedLabel);
  return statusHeader;
};