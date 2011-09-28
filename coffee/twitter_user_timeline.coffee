Ti.include 'common_ui.js'
Ti.include 'common_date.js'

# set up a twitter screen name.
screen_name = 'appcelerator'
win = Ti.UI.currentWindow
win.title = '@' + screen_name

# create table view data object
data = []
tableView = Ti.UI.createTableView
  data:data
  minRowHeight:58

# create status update button
statusUpdateButton = Ti.UI.createButton
  systemButton: Ti.UI.iPhone.SystemButton.ADD

statusUpdateButton.addEventListener 'click', () ->
  win2 = Ti.UI.createWindow
    url:'twitter_status_update.js'
    title: 'Status Update'
    backgroundColor: '#fff'

  # win2.open()
  Ti.UI.currentTab.open win2

win.rightNavButton = statusUpdateButton

# create pull down field to reload
statusHeader = createStatusHeader()
tableView.headerPullView = statusHeader
pulling = false
reloading = false
actInd = statusHeader.getChildren()[1]
arrow =statusHeader.getChildren()[2]
statusLabel = statusHeader.getChildren()[3]
lastUpdatedLabel = statusHeader.getChildren()[4]
page = 1

tableView.addEventListener 'scroll', (e) =>
  offset = e.contentOffset.y
  if (offset <= -65.0 && !pulling)
    t = Ti.UI.create2DMatrix()
    t = t.rotate(-180)
    pulling = true
    arrow.animate({transform:t,duration:180})
    statusLabel.text = 'Release to refresh...'
  else if (pulling && offset > -65.0 && offset < 0)
    pulling = false
    t = Ti.UI.create2DMatrix()
    arrow.animate({transform:t,duration:180})
    statusLabel.text = 'Pull down to refresh...'

tableView.addEventListener 'scrollEnd', (e) =>
  if (pulling && !reloading && e.contentOffset.y <= -65.0)
    reloading = true
    pulling = false
    arrow.hide()
    actInd.show()
    statusLabel.text = 'Reloading...'
    tableView.setContentInsets
      top:60
      animated:true
    arrow.transform=Ti.UI.create2DMatrix()
    beginReloading()

beginReloading = ->
  setTimeout(endReloading,2000)

endReloading = ->
  # @page++
  updateTimeline(screen_name, @page)

  # when you're done, just reset
  tableView.setContentInsets({top:0},{animated:true})
  reloading = false
  lastUpdatedLabel.text = 'Last Updated: ' + formatDate()
  statusLabel.text = 'Pull down to refresh...'
  actInd.hide()
  arrow.show()

updateTimeline = (screen_name, page) ->
  xhr = Ti.Network.createHTTPClient()
  xhr.timeout = 1000000
  xhr.open('GET',"http://api.twitter.com/1/statuses/user_timeline.json?screen_name=#{screen_name}&page=#{page}")

  xhr.onload = () ->
    try
      tweets = JSON.parse this.responseText
      c = 0
      currentData = []
      while c < tweets.length
        tweet = tweets[c].text
        user = tweets[c].user.screen_name
        avatar = tweets[c].user.profile_image_url
        created_at = prettyDate(strtotime(tweets[c].created_at))
        bgcolor = (c % 2) == 0 ? '#fff' : '#eee'

        row = Ti.UI.createTableViewRow
          hasChild:true
          height:'auto'
          backgroundColor:bgcolor

        # Create a vertical layout view to hold all the info labels and images for each tweet
        post_view = Ti.UI.createView
          height:'auto'
          layout:'vertical'
          left:5
          top:5
          bottom:5
          right:5

        av = Ti.UI.createImageView
          image:avatar
          left:0
          top:0
          height:48
          width:48
        # Add the avatar image to the view
        post_view.add(av)

        user_label = Ti.UI.createLabel
          text:user
          left:54
          width:120
          top:-48
          bottom:2
          height:16
          textAlign:'left'
          color:'#444444'
          font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
        # Add the username to the view
        post_view.add(user_label)

        date_label = Ti.UI.createLabel
          text:created_at
          right:0
          top:-18
          bottom:2
          height:14
          textAlign:'right'
          width:110
          color:'#444444'
          font:{fontFamily:'Trebuchet MS',fontSize:12}
        # Add the date to the view
        post_view.add(date_label)

        tweet_text = Ti.UI.createLabel
          text:tweet
          left:54
          top:0
          bottom:2
          height:'auto'
          width:236
          textAlign:'left'
          font:{fontSize:14}
        # Add the tweet to the view
        post_view.add(tweet_text)

        # Add the vertical layout view to the row
        row.add(post_view)
        row.className = 'item' + c
        currentData.push row
        # tableView.appendRow row
        c++

      tableView.setData currentData

      tableView.addEventListener "click",(e) ->
        tweet = tweets[e.index]
        webWindow = Ti.UI.createWindow
          url: "twitter_tweet_window.js"
          status_id: tweet.id_str
          screen_name: tweet.user.screen_name
        Ti.UI.currentTab.open(webWindow)

      win.add(tableView)
    catch error
      alert error

  # Get the data
  xhr.send()

# Get the tweets for 'screen_name'
updateTimeline(screen_name, page)
