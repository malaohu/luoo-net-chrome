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
    var $current = 1;

    $(document).ready(function () {
        $("#div_list").empty();
        init($current);
        load();
        status();
    });

    $("#btn_load_more").click(function () {
        init(++$current);
    });
    $('#div_list').on('click', '.click-play', function () {
        paly($(this).attr('value'), $(this).attr('text'));
    });
    $('#btn_stop').click(function () {
        stop();
    });
    $('#btn_play').click(function () {
        replay();
    });
    $("#openruyo").click(function(){
        var href = $(this).attr("href");
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[0];
            chrome.tabs.update(tab.id, {url: href});
        });
    });
    function init(p) {
        RuYo.music.fun.requestAsync("http://www.luoo.net/tag/?p=" + p, null, function (data) {
            var reg = /<div\s+class="item">\s*<a\shref="[^\d]+(\d+)"[^>]*>\s*<img\s*src="([^"]+)"[^>]*>\s*<\/a>\s*<div\sclass="meta rounded clearfix">\s*<a[^>]*title="([^"]+)"[^>]*>/g;
            var arr, html = '';
            while (reg.test(data)) {
                $('<div class="col-xs-6"><div class="thumbnail"><a href="#" class="click-play" title="点击播放期刊" value="' + RegExp.$1 + '" text="vol.' + RegExp.$1 + ' ' + RegExp.$3 + '"><img src="' + RegExp.$2 + '" alt="' + RegExp.$3 + '"><div class="caption text-nowrap"><h4>vol.' + RegExp.$1 + '</h4>' + RegExp.$3 + '</div></a></div></div>').appendTo($("#div_list"));
            }
        });
    }

    function paly(id, txt) {
        RuYo.music.luonet.getTracks("https://m.luoo.net/vols/" + id, function (err, data) {
            if (err)
                alert(err);
            else
                sendRequest("init", data, function (data) {
                    $('.btn-success').addClass('disabled');
                    load();
                });

        });
    }

    function replay() {
        sendRequest('play',null, function () {
            $('#btn_stop').removeClass('disabled');
            $('#btn_play').addClass('disabled');
        });
    }

    function stop() {
        sendRequest('stop',null, function () {
            $('#btn_play').removeClass('disabled');
            $('#btn_stop').addClass('disabled');
        });
    }

    function load() {
        sendRequest('getinfo', null, function (response) {
            if (!response.error && response.data && response.data.title)
                $('#labAd').html('正在播放：' + response.data.title);
        });
    }

    function status() {
        sendRequest('status', null, function (response) {
            if (!response.error && response.data && response.data == 1) {
                $('#btn_stop').removeClass('disabled');
                $('#btn_play').addClass('disabled');
            } else {
                $('#btn_play').removeClass('disabled');
                $('#btn_stop').addClass('disabled');
            }
        });
    }

    function sendRequest(action, data, cb) {
        chrome.extension.sendRequest({ action: action, data: data }, function (response) {
            console.log(response.error);
            cb(response);
        });
    }
})();
