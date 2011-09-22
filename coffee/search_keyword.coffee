win = Ti.UI.currentWindow

search = Ti.UI.createSearchBar
  barColor:'#000'
  showCancel:true
  height:43
  top:0
  hintText:'artist, album'

win.add(search)

#
# SEARCH BAR EVENTS
#
search.addEventListener 'change',
  (e) -> Ti.API.info 'search bar: you type ' + e.value + ' act val ' + search.value

search.addEventListener 'cancel',
  () -> Ti.API.info 'search bar cancel fired'
  search.blur()

search.addEventListener 'return',
  # (e) -> Ti.UI.createAlertDialog({title:'Search Bar', message:'You typed ' + e.value }).show()
 (e) ->
  search.blur()
  webWin = Ti.UI.createWindow
    url: "search_result.js"
    keyword: e.value
  Ti.UI.currentTab.open webWin

search.addEventListener 'focus',
  (e) -> Ti.API.info 'search bar: focus received'

search.addEventListener 'blur',
  (e) -> Ti.API.info 'search bar:blur received'
