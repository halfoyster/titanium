var tab1, tab2, tab3, tabGroup, win1, win2, win3;
Titanium.UI.setBackgroundColor('#fff');
tabGroup = Titanium.UI.createTabGroup();
win1 = Titanium.UI.createWindow({
  url: 'search.js',
  title: 'Search',
  backgroundColor: '#fff'
});
tab1 = Titanium.UI.createTab({
  icon: 'images/KS_nav_views.png',
  title: 'Search',
  window: win1
});
win2 = Titanium.UI.createWindow({
  url: 'twitter_user_timeline.js',
  title: 'Twitter',
  backgroundColor: '#fff'
});
tab2 = Titanium.UI.createTab({
  icon: 'images/KS_nav_ui.png',
  title: 'Twitter',
  window: win2
});
win3 = Titanium.UI.createWindow({
  url: 'facebook.js',
  title: 'Facebook',
  backgroundColor: '#fff'
});
tab3 = Titanium.UI.createTab({
  icon: 'images/KS_nav_ui.png',
  title: 'Facebook',
  window: win3
});
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.setActiveTab(0);
tabGroup.open({
  transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});