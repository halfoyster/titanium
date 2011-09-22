Titanium.UI.setBackgroundColor '#fff'
# create table view data object
data = [
	{title:'Keyword', hasChild:true, child:'search_keyword.js'}
	{title:'Barcode', hasChild:true, child:'search_barcode.js'}
]

tableview = Ti.UI.createTableView
  data:data

# create table view event listener
tableview.addEventListener 'click',
  (e) ->
  	if e.rowData.child
  		win = Titanium.UI.createWindow
  			url:e.rowData.child
  			title:e.rowData.title
  		Titanium.UI.currentTab.open win,{animated:true}

Ti.UI.currentWindow.add(tableview)

# label1 = Titanium.UI.createLabel
#   color:'#999'
#   text:'Search CDs at your favorite library.'
#   font:{fontSize:20,fontFamily:'Helvetica Neue'}
#   textAlign:'center'
#   width:'auto'
# win1.add(label1)