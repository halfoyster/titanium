var win;
win = Ti.UI.currentWindow;
Ti.Facebook.appid = '134793934930';
Ti.Facebook.permissions = ['publish_stream', 'read_stream'];
win.add(Ti.Facebook.createLoginButton({
  style: 'wide',
  top: 10,
  right: 10
}));