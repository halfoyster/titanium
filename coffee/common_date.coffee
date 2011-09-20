formatDate = ->
  date = new Date
  datestr = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
  if date.getHours() >= 12
    datestr += ' ' + (if date.getHours() == 12 then date.getHours() else date.getHours() - 12) + ':' + date.getMinutes() + ' PM'
  else
    datestr += ' ' + date.getHours() + ':' + date.getMinutes() + ' AM'
  datestr

strtotime = (str, now) ->
  # Emlulates the PHP strtotime function in JavaScript
  # obtained from http://phpjs.org/functions/strtotime:554

  strTmp = str
  strTmp = strTmp.replace(/\s{2,}|^\s|\s$/g, ' ') # unecessary spaces
  strTmp = strTmp.replace(/[\t\r\n]/g, '') # unecessary chars
  if strTmp == 'now'
    return (new Date()).getTime()/1000 # Return seconds, not milli-seconds
  else if (!isNaN(parse = Date.parse(strTmp)))
    return (parse/1000)
  else if (now)
    now = new Date(now*1000) # Accept PHP-style seconds
  else
    now = new Date()

  strTmp = strTmp.toLowerCase()
  __is =
    day:
      'sun': 0
      'mon': 1
      'tue': 2
      'wed': 3
      'thu': 4
      'fri': 5
      'sat': 6
    mon:
      'jan': 0
      'feb': 1
      'mar': 2
      'apr': 3
      'may': 4
      'jun': 5
      'jul': 6
      'aug': 7
      'sep': 8
      'oct': 9
      'nov': 10
      'dec': 11

  process = (m) ->
    ago = (m[2] && m[2] == 'ago')
    num = (num = m[0] == 'last' ? -1 : 1) * (ago ? -1 : 1)

    switch m[0]
      when 'last'
        ''
      when 'next'
        switch (m[1].substring(0, 3))
          when 'yea'
            now.setFullYear(now.getFullYear() + num)
          when 'mon'
            now.setMonth(now.getMonth() + num)
          when 'wee'
            now.setDate(now.getDate() + (num * 7))
          when 'day'
            now.setDate(now.getDate() + num)
          when 'hou'
            now.setHours(now.getHours() + num)
          when 'min'
            now.setMinutes(now.getMinutes() + num)
          when 'sec'
            now.setSeconds(now.getSeconds() + num)
          else
            day
            if (typeof (day = __is.day[m[1].substring(0, 3)]) != 'undefined')
              diff = day - now.getDay()
              if (diff == 0)
                diff = 7 * num
              else if (diff > 0)
                diff -= 7 if m[0] == 'last'
              else
                diff += 7 if m[0] == 'next'

              now.setDate(now.getDate() + diff)
      else
        if /\d+/.test(m[0])
          num *= parseInt(m[0], 10)
          switch (m[1].substring(0, 3))
            when 'yea'
              now.setFullYear(now.getFullYear() + num)
            when 'mon'
              now.setMonth(now.getMonth() + num)
            when 'wee'
              now.setDate(now.getDate() + (num * 7))
            when 'day'
              now.setDate(now.getDate() + num)
            when 'hou'
              now.setHours(now.getHours() + num)
            when 'min'
              now.setMinutes(now.getMinutes() + num)
            when 'sec'
              now.setSeconds(now.getSeconds() + num)
        else
          return false

    return true

  match = strTmp.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/)
  if match != null
    if !match[2]
      match[2] = '00:00:00'
    else if !match[3]
      match[2] += ':00'

    s = match[1].split(/-/g)
    for i in __is.mon
      if __is.mon[i] == s[1] - 1
        s[1] = i

    s[0] = parseInt(s[0], 10)
    s[0] = (if (s[0] >= 0 and s[0] <= 69) then '20' + (if s[0] < 10 then '0' + s[0] else s[0] + '') else (if (s[0] >= 70 and s[0] <= 99) then '19' + s[0] else s[0] + ''))
    return parseInt(this.strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2])+(match[4] ? match[4]/1000 : ''), 10)

  regex = '([+-]?\\d+\\s'+
    '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?'+
    '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday'+
    '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)'+
    '|(last|next)\\s'+
    '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?'+
    '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday'+
    '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))'+
    '(\\sago)?'
  match = strTmp.match(new RegExp(regex, 'gi')); # Brett: seems should be case insensitive per docs, so added 'i'
  if (match == null)
    return false

  i = 0
  while i < match.length
    if (!process(match[i].split(' ')))
      return false
  i++

  return (now.getTime()/1000)

# creates a 'pretty date' from a unix time stamp
prettyDate = (time) ->
  monthname = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  date = new Date(time*1000)
  diff = (((new Date()).getTime() - date.getTime()) / 1000)
  day_diff = Math.floor(diff / 86400)
  if ( isNaN(day_diff) || day_diff < 0 )
    return ''

  if(day_diff >= 31)
    date_year = date.getFullYear()
    month_name = monthname[date.getMonth()]
    date_month = date.getMonth() + 1

    if(date_month < 10)
      date_month = '0'+date_month

    date_monthday = date.getDate()
    if(date_monthday < 10)
      date_monthday = '0'+date_monthday

    return date_monthday + ' ' + month_name + ' ' + date_year

  return day_diff == 0 && (
    diff < 60 && 'just now' ||
    diff < 120 && '1 minute ago' ||
    diff < 3600 && Math.floor( diff / 60 ) + ' minutes ago' ||
    diff < 7200 && '1 hour ago' ||
    diff < 86400 && 'about ' + Math.floor( diff / 3600 ) + ' hours ago') ||
  day_diff == 1 && 'Yesterday' ||
  day_diff < 7 && day_diff + ' days ago' ||
  day_diff < 31 && Math.ceil( day_diff / 7 ) + ' week' + ((Math.ceil( day_diff / 7 )) == 1 ? '' : 's') + ' ago'
