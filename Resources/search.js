var data, tableview;
Titanium.UI.setBackgroundColor('#fff');
data = [
  {
    title: 'Keyword',
    hasChild: true,
    child: 'search_keyword.js'
  }, {
    title: 'Barcode',
    hasChild: true,
    child: 'search_barcode.js'
  }
];
tableview = Ti.UI.createTableView({
  data: data
});
tableview.addEventListener('click', function(e) {
  var win;
  if (e.rowData.child) {
    win = Titanium.UI.createWindow({
      url: e.rowData.child,
      title: e.rowData.title
    });
    return Titanium.UI.currentTab.open(win, {
      animated: true
    });
  }
});
Ti.UI.currentWindow.add(tableview);