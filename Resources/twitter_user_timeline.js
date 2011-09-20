var getTweets, twitter_name, win;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Ti.include('common_ui.js');
Ti.include('common_date.js');
twitter_name = 'appcelerator';
win = Ti.UI.currentWindow;
win.title = '@' + twitter_name;
getTweets = function(screen_name) {
  var data, xhr;
  data = [];
  xhr = Ti.Network.createHTTPClient();
  xhr.timeout = 1000000;
  xhr.open('GET', 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=' + screen_name);
  xhr.onload = function() {
    var actInd, arrow, av, avatar, beginReloading, bgcolor, c, created_at, date_label, endReloading, lastUpdatedLabel, post_view, pulling, reloading, row, statusHeader, statusLabel, tableView, tweet, tweet_text, tweets, user, user_label, _ref;
    try {
      tweets = JSON.parse(this.responseText);
      c = 0;
      while (c < tweets.length) {
        tweet = tweets[c].text;
        user = tweets[c].user.screen_name;
        avatar = tweets[c].user.profile_image_url;
        created_at = prettyDate(strtotime(tweets[c].created_at));
        bgcolor = (_ref = (c % 2) === 0) != null ? _ref : {
          '#fff': '#eee'
        };
        row = Ti.UI.createTableViewRow({
          hasChild: true,
          height: 'auto',
          backgroundColor: bgcolor
        });
        post_view = Ti.UI.createView({
          height: 'auto',
          layout: 'vertical',
          left: 5,
          top: 5,
          bottom: 5,
          right: 5
        });
        av = Ti.UI.createImageView({
          image: avatar,
          left: 0,
          top: 0,
          height: 48,
          width: 48
        });
        post_view.add(av);
        user_label = Ti.UI.createLabel({
          text: user,
          left: 54,
          width: 120,
          top: -48,
          bottom: 2,
          height: 16,
          textAlign: 'left',
          color: '#444444',
          font: {
            fontFamily: 'Trebuchet MS',
            fontSize: 14,
            fontWeight: 'bold'
          }
        });
        post_view.add(user_label);
        date_label = Ti.UI.createLabel({
          text: created_at,
          right: 0,
          top: -18,
          bottom: 2,
          height: 14,
          textAlign: 'right',
          width: 110,
          color: '#444444',
          font: {
            fontFamily: 'Trebuchet MS',
            fontSize: 12
          }
        });
        post_view.add(date_label);
        tweet_text = Ti.UI.createLabel({
          text: tweet,
          left: 54,
          top: 0,
          bottom: 2,
          height: 'auto',
          width: 236,
          textAlign: 'left',
          font: {
            fontSize: 14
          }
        });
        post_view.add(tweet_text);
        row.add(post_view);
        row.className = 'item' + c;
        data[c] = row;
        c++;
      }
      tableView = Ti.UI.createTableView({
        data: data,
        minRowHeight: 58
      });
      statusHeader = createStatusHeader();
      tableView.headerPullView = statusHeader;
      pulling = false;
      reloading = false;
      actInd = statusHeader.getChildren()[1];
      arrow = statusHeader.getChildren()[2];
      statusLabel = statusHeader.getChildren()[3];
      lastUpdatedLabel = statusHeader.getChildren()[4];
      tableView.addEventListener('scroll', __bind(function(e) {
        var offset, t;
        offset = e.contentOffset.y;
        if (offset <= -65.0 && !pulling) {
          t = Ti.UI.create2DMatrix();
          t = t.rotate(-180);
          pulling = true;
          arrow.animate({
            transform: t,
            duration: 180
          });
          return statusLabel.text = 'Release to refresh...';
        } else if (pulling && offset > -65.0 && offset < 0) {
          pulling = false;
          t = Ti.UI.create2DMatrix();
          arrow.animate({
            transform: t,
            duration: 180
          });
          return statusLabel.text = 'Pull down to refresh...';
        }
      }, this));
      tableView.addEventListener('scrollEnd', __bind(function(e) {
        if (pulling && !reloading && e.contentOffset.y <= -65.0) {
          reloading = true;
          pulling = false;
          arrow.hide();
          actInd.show();
          statusLabel.text = 'Reloading...';
          tableView.setContentInsets({
            top: 60,
            animated: true
          });
          arrow.transform = Ti.UI.create2DMatrix();
          return beginReloading();
        }
      }, this));
      beginReloading = function() {
        return setTimeout(endReloading, 2000);
      };
      endReloading = function() {
        var lastRow;
        lastRow = tweets.length;
        c = lastRow;
        while (c < lastRow + 10) {
          tableView.appendRow({
            title: 'Row ' + c
          });
          c++;
        }
        tableView.setContentInsets({
          top: 0
        }, {
          animated: true
        });
        reloading = false;
        lastUpdatedLabel.text = 'Last Updated: ' + formatDate();
        statusLabel.text = 'Pull down to refresh...';
        actInd.hide();
        return arrow.show();
      };
      return Ti.UI.currentWindow.add(tableView);
    } catch (error) {
      return alert(error);
    }
  };
  return xhr.send();
};
getTweets(twitter_name);