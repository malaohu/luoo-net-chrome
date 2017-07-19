 /*

.___  ___.      ___       __          ___       ______    __    __   __    __
|   \/   |     /   \     |  |        /   \     /  __  \  |  |  |  | |  |  |  |
|  \  /  |    /  ^  \    |  |       /  ^  \   |  |  |  | |  |__|  | |  |  |  |
|  |\/|  |   /  /_\  \   |  |      /  /_\  \  |  |  |  | |   __   | |  |  |  |
|  |  |  |  /  _____  \  |  `----./  _____  \ |  `--'  | |  |  |  | |  `--'  |
|__|  |__| /__/     \__\ |_______/__/     \__\ \______/  |__|  |__|  \______/

GITHUB  :   https://github.com/malaohu
Email   :   laohu_ma#163.com
Blog    :   http://51.RUYO.net

*/
(function () {
    var current = {};
    var status = 0;
    var myPlaylist = new jPlayerPlaylist({
        jPlayer: "#jquery_jplayer"
    }, [], {
        playlistOptions: {
            enableRemoveControls: true,
            autoPlay: true
        },
        supplied: "mp3",
        ended: function () {
            console.log('play ended ');
        },
        play:function(d){
            current = d.jPlayer.status.media;
        }
    });

    chrome.extension.onRequest.addListener(
        function (request, sender, sendResponse) {
            console.log(request.action);
            switch (request.action) {
                case 'init'://加载播放列表
                    init(request.data, function (err) {
                        if (err)
                            sendResponse({ error: 999, msg: err });
                        else
                            sendResponse({ error: 0, msg: 'success' });
                    });
                    break;
                case 'play'://播放
                    play(function (err) {
                        if (err)
                            sendResponse({ error: 999, msg: err });
                        else
                            sendResponse({ error: 0, msg: 'success' });
                    });
                    break;
                case 'stop'://停止
                    stop(function (err) {
                        if (err)
                            sendResponse({ error: 999, msg: err });
                        else
                            sendResponse({ error: 0, msg: 'success' });
                    });
                    break;
                case 'getinfo'://获取信息
                    sendResponse({ error: 0, msg: 'success', data: current });
                    break;

                case 'status'://获取播放状态
                    sendResponse({ error: 0, msg: 'success', data: status });
                    break;
                default:

            }


        });

    function init(jsn, cb) {
            var arr = [];
            if (jsn && jsn.length > 0) {
                for (var i = 0; i < jsn.length; i++) {
                    arr.push({ title: jsn[i].title, mp3: jsn[i].mp3 });
                }
            }
            console.log(arr);
            myPlaylist.setPlaylist(arr);
            myPlaylist.play(0);
            status = 1;
            cb(null);
        }

        function stop(cb) {
            myPlaylist.pause();
            status = 0;
            cb(null);
        }

        function play(cb) {
            myPlaylist.play();
            status = 1;
            cb(null);
        }



    })();