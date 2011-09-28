var cancelButton, imageView, locationButton, mapView, photoButton, postButton, selectFromPhotoGallery, setCurrentPosition, sourceSelect, startCamera, textArea, tweet, twitterApi, uploadToTwitPic, win;
Ti.include('lib/twitter_api.js');
win = Ti.UI.currentWindow;
win.addEventListener('click', function() {
  return textArea.blur();
});
win.addEventListener('close', function() {
  var text;
  text = textArea.value;
  return Ti.App.Properties.setString('previousText', text);
});
win.addEventListener('open', function() {
  var text;
  text = Ti.App.Properties.getString('previousText');
  if (text) {
    return textArea.value = text;
  }
});
textArea = Ti.UI.createTextArea({
  height: 150,
  width: 300,
  top: 10,
  font: {
    fontSize: 20
  },
  borderWidth: 2,
  borderColor: '#bbb',
  borderRadius: 5
});
win.add(textArea);
postButton = Ti.UI.createButton({
  top: 170,
  right: 10,
  width: 90,
  height: 44,
  title: 'POST'
});
postButton.addEventListener('click', function() {
  if (textArea.value) {
    tweet(textArea.value);
    return win.close();
  }
});
win.add(postButton);
cancelButton = Ti.UI.createButton({
  top: 170,
  left: 10,
  width: 90,
  height: 44,
  title: 'CANCEL'
});
cancelButton.addEventListener('click', function() {
  return textArea.blur();
});
win.add(cancelButton);
locationButton = Ti.UI.createButton({
  top: 170,
  left: 115,
  width: 90,
  height: 44,
  title: 'Location'
});
Ti.Geolocation.purpose = 'Twitter投稿のため';
setCurrentPosition = function() {
  textArea.blur();
  return Ti.Geolocation.getCurrentPosition(function(e) {
    var currentPosition, latitude, longitude;
    if (!e.success || e.error) {
      alert('位置情報が取得できませんでした');
      return;
    }
    latitude = e.coords.latitude;
    longitude = e.coords.longitude;
    currentPosition = Ti.Map.createAnnotation({
      latitude: latitude,
      longitude: longitude,
      title: "現在地",
      pincolor: Ti.Map.ANNOTATION_GREEN,
      animate: true
    });
    mapView.addAnnotation(currentPosition);
    mapView.show();
    return mapView.setLocation({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });
  });
};
locationButton.addEventListener('click', setCurrentPosition);
win.add(locationButton);
mapView = Ti.Map.createView({
  width: 320,
  height: 240,
  top: 220,
  mapType: Titanium.Map.STANDARD_TYPE,
  region: {
    latitude: 40.0,
    longitude: 130,
    latitudeDelta: 30,
    longitudeDelta: 30
  },
  animate: true,
  regionFit: true
});
mapView.hide();
win.add(mapView);
imageView = Titanium.UI.createImageView({
  width: 'auto',
  height: 240,
  top: 220
});
imageView.hide();
win.add(imageView);
sourceSelect = Titanium.UI.createOptionDialog({
  options: [L('option_camera'), L('option_library'), L('cancel')],
  cancel: 2,
  title: L('title_attach_photo')
});
sourceSelect.addEventListener('click', function(e) {
  switch (e.index) {
    case 0:
      return startCamera();
    case 1:
      return selectFromPhotoGallery();
  }
});
photoButton = Ti.UI.createButton({
  top: 220,
  left: 120,
  width: 80,
  height: 44,
  title: 'photo'
});
photoButton.addEventListener('click', function() {
  return sourceSelect.show();
});
win.add(photoButton);
startCamera = function() {
  return Titanium.Media.showCamera({
    success: function(event) {
      var image;
      image = event.media;
      imageView.image = image;
      imageView.show();
      return uploadToTwitPic(image);
    },
    error: function(error) {
      if (error.code === Titanium.Media.NO_CAMERA) {
        return alert('カメラがありません');
      }
    },
    saveToPhotoGallery: true,
    allowEditing: true,
    mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
  });
};
selectFromPhotoGallery = function() {
  return Ti.Media.openPhotoGallery({
    success: function(event) {
      var image;
      image = event.media;
      imageView.image = image;
      imageView.show();
      return uploadToTwitPic(image);
    },
    allowEditing: false,
    mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
  });
};
uploadToTwitPic = function(image) {
  var header, params, verifyURL, xhr;
  xhr = Ti.Network.createHTTPClient();
  verifyURL = 'https://api.twitter.com/1/account/verify_credentials.json';
  params = {
    url: verifyURL,
    method: 'GET'
  };
  header = twitterApi.oAuthAdapter.createOAuthHeader(params);
  return xhr.onload = function() {
    var res;
    res = JSON.parse(this.responseText);
    textArea.value = (textArea.value || '') + ' ' + res.url;
    xhr.open('POST', 'http://api.twitpic.com/2/upload.json');
    xhr.setRequestHeader('X-Verify-Credentials-Authorization', header);
    xhr.setRequestHeader('X-Auth-Service-Provider', verifyURL);
    return xhr.send({
      key: 'YOUR_TWITPIC_API_KEY',
      message: textArea.value,
      media: image
    });
  };
};
Ti.App.twitterApi = new TwitterApi({
  consumerKey: 'ElUqdQS2OU0ZFbiPs3kcA',
  consumerSecret: 'St7cYqgMuXaSCrzuHKxUP99Rtpsoo8UWsxQXp65c'
});
twitterApi = Ti.App.twitterApi;
twitterApi.init();
tweet = function(message) {
  var params;
  params = {
    status: message
  };
  if (latitude && longitude) {
    params['lat'] = latitude;
    params['long'] = longitude;
  }
  return twitterApi.statuses_update({
    onSuccess: function(responce) {
      alert('tweet success');
      return Ti.API.info(responce);
    },
    onError: function(error) {
      return Ti.API.error(error);
    },
    parameters: params
  });
};