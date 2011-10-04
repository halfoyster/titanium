Ti.include 'lib/twitter_api.js'

win = Ti.UI.currentWindow

win.addEventListener 'click',() ->
  textArea.blur()

win.addEventListener 'close', () ->
  text = textArea.value
  Ti.App.Properties.setString('previousText', text)

win.addEventListener 'open', () ->
  text = Ti.App.Properties.getString('previousText');
  if text
    textArea.value = text

# create text area
textArea = Ti.UI.createTextArea
  height:150
  width:300
  top:10
  font:{fontSize:20}
  borderWidth:2
  borderColor:'#bbb'
  borderRadius:5

win.add(textArea)

# create post button
postButton = Ti.UI.createButton
  top: 170
  right: 10
  width: 90
  height: 44
  title: 'POST'

postButton.addEventListener 'click', () ->
  if textArea.value
    tweet textArea.value
    win.close()

win.add postButton

# create cancel button
cancelButton = Ti.UI.createButton
  top:170
  left:10
  width:90
  height:44
  title:'CANCEL'

cancelButton.addEventListener 'click', () ->
  textArea.blur()

win.add cancelButton

# create current location button
locationButton = Ti.UI.createButton
  top: 170
  left: 115
  width: 90
  height: 44
  title: 'Location'

Ti.Geolocation.purpose = 'Twitter投稿のため'
setCurrentPosition = () ->
  textArea.blur()
  Ti.Geolocation.getCurrentPosition (e) ->
    if !e.success || e.error
      alert('位置情報が取得できませんでした')
      return

    latitude = e.coords.latitude
    longitude = e.coords.longitude

    currentPosition = Ti.Map.createAnnotation
      latitude:latitude
      longitude:longitude
      title:"現在地"
      pincolor:Ti.Map.ANNOTATION_GREEN
      animate:true

    mapView.addAnnotation currentPosition
    mapView.show()
    mapView.setLocation
      latitude:latitude
      longitude:longitude
      latitudeDelta:0.01
      longitudeDelta:0.01

locationButton.addEventListener 'click', setCurrentPosition

win.add locationButton

# create map view
mapView = Ti.Map.createView
  width: 320
  height: 240
  top: 220
  mapType: Titanium.Map.STANDARD_TYPE
  region:{latitude:40.0, longitude:130, latitudeDelta:30, longitudeDelta:30}
  animate:true
  regionFit:true

mapView.hide()
win.add mapView

# create image view
imageView = Titanium.UI.createImageView
  width: 'auto'
  height: 240
  top: 220

imageView.hide()
win.add imageView

# photo
sourceSelect = Titanium.UI.createOptionDialog
    options:[L('option_camera'), L('option_library'), L('cancel')]
    cancel:2
    title:L('title_attach_photo')

sourceSelect.addEventListener 'click', (e) ->
  switch e.index
    when 0
      startCamera()
    when 1
      selectFromPhotoGallery()

photoButton = Ti.UI.createButton
  top: 220
  left: 120
  width: 80
  height: 44
  title: 'photo'

photoButton.addEventListener 'click', () ->
  sourceSelect.show()

win.add photoButton

startCamera = () ->
  Titanium.Media.showCamera
    success:(event) ->
      image = event.media
      imageView.image = image
      imageView.show()
      uploadToTwitPic(image)

    #cancel:() ->
    error:(error) ->
      if error.code == Titanium.Media.NO_CAMERA
        alert('カメラがありません')
    saveToPhotoGallery:true
    allowEditing:true
    mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]

selectFromPhotoGallery = () ->
  Ti.Media.openPhotoGallery
    success: (event) ->
      image = event.media
      imageView.image = image
      imageView.show()
      uploadToTwitPic(image)
    # error:  (error) ->
    # cancel: () ->
    allowEditing: false
    mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]

uploadToTwitPic = (image) ->
  xhr = Ti.Network.createHTTPClient()

  verifyURL = 'https://api.twitter.com/1/account/verify_credentials.json'
  params = {
    url:verifyURL
    method: 'GET'
    }

    header = twitterApi.oAuthAdapter.createOAuthHeader(params)

    xhr.onload = () ->
      res = JSON.parse(this.responseText)
      textArea.value = ( textArea.value || '' ) + ' ' + res.url

    # xhr.onerror = () ->

    xhr.open 'POST','http://api.twitpic.com/2/upload.json'
    xhr.setRequestHeader 'X-Verify-Credentials-Authorization',header
    xhr.setRequestHeader 'X-Auth-Service-Provider',verifyURL

    xhr.send
      key: 'YOUR_TWITPIC_API_KEY'
      message: textArea.value
      media: image

# twitter api initialization
Ti.App.twitterApi = new TwitterApi
  # consumerKey:'YOUR_CONSUMER_KEY'
  # consumerSecret:'YOUR_CONSUMER_SECRET'
  consumerKey:'ElUqdQS2OU0ZFbiPs3kcA'
  consumerSecret:'St7cYqgMuXaSCrzuHKxUP99Rtpsoo8UWsxQXp65c'

twitterApi = Ti.App.twitterApi
twitterApi.init()

tweet = (message, latitude, longitude) ->
  params = {status: message}
  if latitude && longitude
    params['lat']  = latitude
    params['long'] = longitude

  twitterApi.statuses_update
    onSuccess: (responce) ->
      alert('tweet success')
      Ti.API.info(responce)
    onError: (error) ->
      Ti.API.error(error)
    parameters:params
