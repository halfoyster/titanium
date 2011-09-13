# -*- coding: utf-8 -*-
# original https://gist.github.com/715378
# thanks hakobe!
# Macで動作確認。Windowsの場合、spawnを使うとよいらしい。 参考: https://gist.github.com/325036
# curl http://127.0.0.1:9090/run

require 'webrick'

server = WEBrick::HTTPServer.new({
                                   :DocumentRoot => nil,
                                   :BindAddress => '0.0.0.0',
                                   :Port => 9090
                                 })

['INT', 'TERM'].each {|signal|
  Signal.trap(signal){ server.shutdown }
}

last_pid = nil

server.mount_proc("/run") { |req, res|
  if last_pid
    Process.kill('KILL', last_pid)
  end

  last_pid = fork do
    # should be written in relative path...
    exec "/Users/hiroyuki.kondo/Library/Application Support/Titanium/mobilesdk/osx/1.7.2/iphone/builder.py", "run", Dir.pwd
  end
  # system "coffee -o "+Dir.pwd+"/Resources/js/ -c "+Dir.pwd+"/Resources/coffee/"
  res["content-type"] = "text/html; charset=utf-8"
  res.body = "ok"
}
warn 'starting server at localhost:9090'
server.start
