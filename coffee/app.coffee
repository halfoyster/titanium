# this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor '#fff'

# create tab group
tabGroup = Titanium.UI.createTabGroup()

#
# create base UI tab and root window
#
win1 = Titanium.UI.createWindow
  url:'search.js'
  title:'Search'
  backgroundColor:'#fff'

tab1 = Titanium.UI.createTab
  icon:'images/KS_nav_views.png'
  title:'Search'
  window:win1

# label1 = Titanium.UI.createLabel
#   color:'#999'
#   text:'I am Window 1'
#   font:{fontSize:20,fontFamily:'Helvetica Neue'}
#   textAlign:'center'
#   width:'auto'

# win1.add label1

#
# create controls tab and root window
#
win2 = Titanium.UI.createWindow
  url:'twitter_user_timeline.js'
  title:'Twitter'
  backgroundColor:'#fff'

tab2 = Titanium.UI.createTab
  icon:'images/KS_nav_ui.png'
  title:'Twitter'
  window:win2

# label2 = Titanium.UI.createLabel
#   color:'#999'
#   text:'I am Window 2'
#   font:{fontSize:20,fontFamily:'Helvetica Neue'}
#   textAlign:'center'
#   width:'auto'

# win2.add label2

win3 = Titanium.UI.createWindow
  url:'facebook.js'
  title:'Facebook'
  backgroundColor:'#fff'

tab3 = Titanium.UI.createTab
  icon:'images/KS_nav_ui.png'
  title:'Facebook'
  window:win3

# label3 = Titanium.UI.createLabel
#   color:'#999'
#   text:'I am Window 3'
#   font:{fontSize:20,fontFamily:'Helvetica Neue'}
#   textAlign:'center'
#   width:'auto'

# win3.add label3

#
#  add tabs
#
tabGroup.addTab tab1
tabGroup.addTab tab2
tabGroup.addTab tab3

tabGroup.setActiveTab(0)
# open tab group with a transition animation
tabGroup.open
  transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
