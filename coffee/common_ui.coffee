createActivityIndicator = ->
  Ti.UI.createActivityIndicator
    height: 'auto'
    width: 'auto'
    style: Ti.UI.iPhone.ActivityIndicatorStyle
    # font: {fontSize: 15},
    # color: '#000',
    # message: 'loading...'

createStatusHeader = ->
  statusHeader = Ti.UI.createView
    backgroundColor: '#e2e7ed'
    height: 55

  border = Ti.UI.createView
    backgroundColor:'#576c89'
    height:2
    bottom:0
  statusHeader.add border

  # actInd = statusHeader.getChildren()[1]
  actInd = createActivityIndicator()
  actInd.left =15
  actInd.bottom = 15
  statusHeader.add actInd

  # arrow = statusHeader.getChildren()[2]
  arrow = Ti.UI.createView
    backgroundImage:'images/whiteArrow.png'
    width:23
    height:60
    bottom:10
    left:20
  statusHeader.add arrow

  # statusLabel = statusHeader.getChildren()[3]
  statusLabel = Ti.UI.createLabel
    text: 'Pull down to refresh...'
    left: 60
    width: 200
    bottom: 30
    height:'auto',
    color:'#576c89',
    textAlign:'center',
    font:{fontSize:13,fontWeight:'bold'},
    shadowColor:'#999',
    shadowOffset:{x:0,y:1}
  statusHeader.add statusLabel

  # lastUpdatedLabel = statusHeader.getChildren()[4]
  lastUpdatedLabel = Ti.UI.createLabel
  	text:"Last Updated: #{formatDate()}"
  	left:55
  	width:200
  	bottom:15
  	height:'auto'
  	color:'#576c89'
  	textAlign:'center'
  	font:{fontSize:12}
  	shadowColor:'#999'
  	shadowOffset:{x:0,y:1}
  statusHeader.add lastUpdatedLabel

  statusHeader