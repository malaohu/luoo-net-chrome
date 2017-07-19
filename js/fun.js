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
var RuYo = {};
RuYo.music = RuYo.music || {};
RuYo.music.fun = {};

RuYo.music.fun.request = function (url, data) {
        var jsn = {};
        $.extend(jsn, data);
        return $.ajax({ url: url, type: "GET", data: jsn, async: false }).responseText;
}

RuYo.music.fun.requestAsync = function (url, data, callback) {
        var jsn = {};
        $.extend(jsn, data);
        return $.ajax({ url: url, type: "GET", data: jsn, success: function (msg) { callback(msg); } });
}

