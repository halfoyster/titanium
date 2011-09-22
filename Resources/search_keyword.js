var search, win;
win = Ti.UI.currentWindow;
search = Ti.UI.createSearchBar({
  barColor: '#000',
  showCancel: true,
  height: 43,
  top: 0,
  hintText: 'artist, album'
});
win.add(search);
search.addEventListener('change', function(e) {
  return Ti.API.info('search bar: you type ' + e.value + ' act val ' + search.value);
});
search.addEventListener('cancel', function() {
  return Ti.API.info('search bar cancel fired');
}, search.blur());
search.addEventListener('return', function(e) {
  var webWin;
  search.blur();
  webWin = Ti.UI.createWindow({
    url: "search_result.js",
    keyword: e.value
  });
  return Ti.UI.currentTab.open(webWin);
});
search.addEventListener('focus', function(e) {
  return Ti.API.info('search bar: focus received');
});
search.addEventListener('blur', function(e) {
  return Ti.API.info('search bar:blur received');
});