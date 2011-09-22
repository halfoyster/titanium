# create table view data object
data = [
	{title:'Login', hasChild:true, child:'facebook_login.js'}
	{title:'Query', hasChild:true, child:'facebook_query.js'}
	{title:'Publish Stream', hasChild:true, child:'facebook_publish_stream.js'}
	{title:'Photos', hasChild:true, child:'facebook_photos.js'}
]

# create table view
tableview = Ti.UI.createTableView
	data:data

# create table view event listener
tableview.addEventListener 'click', (e) ->
	if e.rowData.child
		win = Ti.UI.createWindow
			url:e.rowData.child
			title:e.rowData.title

		Ti.UI.currentTab.open win,{animated:true}

# add table view to the window
Ti.UI.currentWindow.add(tableview)
