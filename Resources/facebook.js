var data, tableview;
data = [
  {
    title: 'Login',
    hasChild: true,
    child: 'facebook_login.js'
  }, {
    title: 'Query',
    hasChild: true,
    child: 'facebook_query.js'
  }, {
    title: 'Publish Stream',
    hasChild: true,
    child: 'facebook_publish_stream.js'
  }, {
    title: 'Photos',
    hasChild: true,
    child: 'facebook_photos.js'
  }
];
tableview = Ti.UI.createTableView({
  data: data
});
tableview.addEventListener('click', function(e) {
  var win;
  if (e.rowData.child) {
    win = Ti.UI.createWindow({
      url: e.rowData.child,
      title: e.rowData.title
    });
    return Ti.UI.currentTab.open(win, {
      animated: true
    });
  }
});
Ti.UI.currentWindow.add(tableview);