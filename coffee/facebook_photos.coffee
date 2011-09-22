# globals Titanium, Ti, alert, require, setTimeout, setInterval, JSON

Ti.include 'facebook_login.js'

B1_TITLE = 'Upload Photo from Gallery with Graph API'
B2_TITLE = 'Upload Photo from file with REST API'

b1 = Ti.UI.createButton
	title:B1_TITLE
	left: 10, right: 10, top: 0, height: 40

b2 = Ti.UI.createButton
	title: B2_TITLE
	left: 10, right: 10, top: 50, height: 40

showRequestResult = (e) ->
	s = ''
	if e.success
		s = 'SUCCESS'
		if e.result
			s += '; ' + e.result
	else
		s = 'FAIL'
		if e.error
			s += '; ' + e.error

	b1.title = B1_TITLE
	b2.title = B2_TITLE
	alert s

actionsView = Ti.UI.createView
	top: 55, left: 0, right: 0, visible: Ti.Facebook.loggedIn, height: 'auto'

actionsView.add b1
actionsView.add b2

Ti.Facebook.addEventListener 'login', (e) ->
	if e.success
		actionsView.show()
	if e.error
		alert(e.error)

Ti.Facebook.addEventListener 'logout', (e) ->
	Ti.API.info 'logout event'
	actionsView.hide()

b1.addEventListener 'click', () ->
	Ti.Media.openPhotoGallery
		success:(event) ->
			b1.title = 'Uploading Photo...'
			data = {picture: event.media}
			Ti.Facebook.requestWithGraphPath('me/photos', data, 'POST', showRequestResult)
		cancel:() ->

		error:(error) ->

		allowEditing:true

b2.addEventListener 'click', () ->
	b2.title = 'Uploading Photo...'
	f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'images', 'flower.jpg')
	blob = f.read()
	data = {
		caption: 'behold, a flower'
		picture: blob
	}
	Ti.Facebook.request('photos.upload', data, showRequestResult)

win.add(actionsView)
