var formatDate, prettyDate, strtotime;
formatDate = function() {
  var date, datestr;
  date = new Date;
  datestr = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
  if (date.getHours() >= 12) {
    datestr += ' ' + (date.getHours() === 12 ? date.getHours() : date.getHours() - 12) + ':' + date.getMinutes() + ' PM';
  } else {
    datestr += ' ' + date.getHours() + ':' + date.getMinutes() + ' AM';
  }
  return datestr;
};
strtotime = function(str, now) {
  var i, match, parse, process, regex, s, strTmp, __is, _i, _len, _ref, _ref2;
  strTmp = str;
  strTmp = strTmp.replace(/\s{2,}|^\s|\s$/g, ' ');
  strTmp = strTmp.replace(/[\t\r\n]/g, '');
  if (strTmp === 'now') {
    return (new Date()).getTime() / 1000;
  } else if (!isNaN(parse = Date.parse(strTmp))) {
    return parse / 1000;
  } else if (now) {
    now = new Date(now * 1000);
  } else {
    now = new Date();
  }
  strTmp = strTmp.toLowerCase();
  __is = {
    day: {
      'sun': 0,
      'mon': 1,
      'tue': 2,
      'wed': 3,
      'thu': 4,
      'fri': 5,
      'sat': 6
    },
    mon: {
      'jan': 0,
      'feb': 1,
      'mar': 2,
      'apr': 3,
      'may': 4,
      'jun': 5,
      'jul': 6,
      'aug': 7,
      'sep': 8,
      'oct': 9,
      'nov': 10,
      'dec': 11
    }
  };
  process = function(m) {
    var ago, day, diff, num, _ref;
    ago = m[2] && m[2] === 'ago';
    num = (num = (_ref = m[0] === 'last') != null ? _ref : -{
      1: 1
    }) * (ago != null ? ago : -{
      1: 1
    });
    switch (m[0]) {
      case 'last':
        '';
        break;
      case 'next':
        switch (m[1].substring(0, 3)) {
          case 'yea':
            now.setFullYear(now.getFullYear() + num);
            break;
          case 'mon':
            now.setMonth(now.getMonth() + num);
            break;
          case 'wee':
            now.setDate(now.getDate() + (num * 7));
            break;
          case 'day':
            now.setDate(now.getDate() + num);
            break;
          case 'hou':
            now.setHours(now.getHours() + num);
            break;
          case 'min':
            now.setMinutes(now.getMinutes() + num);
            break;
          case 'sec':
            now.setSeconds(now.getSeconds() + num);
            break;
          default:
            day;
            if (typeof (day = __is.day[m[1].substring(0, 3)]) !== 'undefined') {
              diff = day - now.getDay();
              if (diff === 0) {
                diff = 7 * num;
              } else if (diff > 0) {
                if (m[0] === 'last') {
                  diff -= 7;
                }
              } else {
                if (m[0] === 'next') {
                  diff += 7;
                }
              }
              now.setDate(now.getDate() + diff);
            }
        }
        break;
      default:
        if (/\d+/.test(m[0])) {
          num *= parseInt(m[0], 10);
          switch (m[1].substring(0, 3)) {
            case 'yea':
              now.setFullYear(now.getFullYear() + num);
              break;
            case 'mon':
              now.setMonth(now.getMonth() + num);
              break;
            case 'wee':
              now.setDate(now.getDate() + (num * 7));
              break;
            case 'day':
              now.setDate(now.getDate() + num);
              break;
            case 'hou':
              now.setHours(now.getHours() + num);
              break;
            case 'min':
              now.setMinutes(now.getMinutes() + num);
              break;
            case 'sec':
              now.setSeconds(now.getSeconds() + num);
          }
        } else {
          return false;
        }
    }
    return true;
  };
  match = strTmp.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);
  if (match !== null) {
    if (!match[2]) {
      match[2] = '00:00:00';
    } else if (!match[3]) {
      match[2] += ':00';
    }
    s = match[1].split(/-/g);
    _ref = __is.mon;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      if (__is.mon[i] === s[1] - 1) {
        s[1] = i;
      }
    }
    s[0] = parseInt(s[0], 10);
    s[0] = (s[0] >= 0 && s[0] <= 69 ? '20' + (s[0] < 10 ? '0' + s[0] : s[0] + '') : (s[0] >= 70 && s[0] <= 99 ? '19' + s[0] : s[0] + ''));
    return parseInt(this.strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2]) + ((_ref2 = match[4]) != null ? _ref2 : match[4] / {
      1000: ''
    }), 10);
  }
  regex = '([+-]?\\d+\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)' + '|(last|next)\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))' + '(\\sago)?';
  match = strTmp.match(new RegExp(regex, 'gi'));
  if (match === null) {
    return false;
  }
  i = 0;
  while (i < match.length) {
    if (!process(match[i].split(' '))) {
      return false;
    }
  }
  i++;
  return now.getTime() / 1000;
};
prettyDate = function(time) {
  var date, date_month, date_monthday, date_year, day_diff, diff, month_name, monthname, _ref;
  monthname = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  date = new Date(time * 1000);
  diff = ((new Date()).getTime() - date.getTime()) / 1000;
  day_diff = Math.floor(diff / 86400);
  if (isNaN(day_diff) || day_diff < 0) {
    return '';
  }
  if (day_diff >= 31) {
    date_year = date.getFullYear();
    month_name = monthname[date.getMonth()];
    date_month = date.getMonth() + 1;
    if (date_month < 10) {
      date_month = '0' + date_month;
    }
    date_monthday = date.getDate();
    if (date_monthday < 10) {
      date_monthday = '0' + date_monthday;
    }
    return date_monthday + ' ' + month_name + ' ' + date_year;
  }
  return day_diff === 0 && (diff < 60 && 'just now' || diff < 120 && '1 minute ago' || diff < 3600 && Math.floor(diff / 60) + ' minutes ago' || diff < 7200 && '1 hour ago' || diff < 86400 && 'about ' + Math.floor(diff / 3600) + ' hours ago') || day_diff === 1 && 'Yesterday' || day_diff < 7 && day_diff + ' days ago' || day_diff < 31 && Math.ceil(day_diff / 7) + ' week' + ((_ref = (Math.ceil(day_diff / 7)) === 1) != null ? _ref : {
    '': 's'
  }) + ' ago';
};