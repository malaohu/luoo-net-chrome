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
RuYo.music = RuYo.music || {};
RuYo.music.luonet = {};
(function () {
    RuYo.music.luonet.getTracks = function (url,callback) {
        RuYo.music.fun.requestAsync(url, {}, function (res) {
            if (/data=([^<]+);/i.test(res)) {
                var jsn = JSON.parse(RegExp.$1);
                var vol_name = jsn.page.content.data.vol.title;
                var data = jsn.page.content.data.singles;
                var arr = [];
                for (var i = data.length - 1; i >= 0; i--) 
                    arr.push(getSong(data[i].single_id,' ----- 来自期刊 : ' + vol_name));
                callback(null,arr);
            } else {
                console.log('error.....');
                callback('获取歌曲信息出错',null);
            }
        });
    }
    function getSong(id,pretext){
        var url = 'https://m.luoo.net/api/songs/' + id;
        var jsn = RuYo.music.fun.request(url,null);
        jsn = JSON.parse(jsn);
        return {"title":jsn.name + pretext,"mp3":jsn.url.full};
    }
})();