win = Ti.UI.currentWindow
permalink = "http://twitter.com/" + win.screen_name + "/status/" + win.status_id
webView = Ti.UI.createWebView
  url: permalink

win.add webView