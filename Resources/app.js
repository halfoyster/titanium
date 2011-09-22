var label1, label2, tab1, tab2, tabGroup, win1, win2;
Titanium.UI.setBackgroundColor('#fff');
tabGroup = Titanium.UI.createTabGroup();
win1 = Titanium.UI.createWindow({
  url: 'twitter_user_timeline.js',
  title: 'Twitter',
  backgroundColor: '#fff'
});
tab1 = Titanium.UI.createTab({
  icon: 'KS_nav_views.png',
  title: 'Twitter',
  window: win1
});
label1 = Titanium.UI.createLabel({
  color: '#999',
  text: 'I am Window 1',
  font: {
    fontSize: 20,
    fontFamily: 'Helvetica Neue'
  },
  textAlign: 'center',
  width: 'auto'
});
win1.add(label1);
win2 = Titanium.UI.createWindow({
  url: 'facebook.js',
  title: 'Facebook',
  backgroundColor: '#fff'
});
tab2 = Titanium.UI.createTab({
  icon: 'KS_nav_ui.png',
  title: 'Facebook',
  window: win2
});
label2 = Titanium.UI.createLabel({
  color: '#999',
  text: 'I am Window 2',
  font: {
    fontSize: 20,
    fontFamily: 'Helvetica Neue'
  },
  textAlign: 'center',
  width: 'auto'
});
win2.add(label2);
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.setActiveTab(0);
tabGroup.open({
  transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});