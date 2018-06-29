/**
 *  Created by fangqing on 2017/12/21.
 */

(function () {
    'use strict';

    app.controller('waitingCtrl', ['$window', '$rootScope', '$scope', '$state', '$http', 'REST', 'RS', function ($window, $rootScope, $scope, $state, $http, REST, RS) {
        $('body').loading({
            title: '请稍等',
            name: 'test1',
            discription: '加载中'
        });

		alert('qw')
        var GB2312UnicodeConverter = {
            ToGB2312: function (str) {
                return unescape(str.replace(/\\u/gi, '%u'));
            }
        };
        var code;
        var url = $window.location.href;

        var aa = url.split('?');
        console.log(url)
        for (var i = 0; i < aa.length; i++) {
            if (i === 1) {
                code = aa[i];
            }
        }
        var userInfo = GB2312UnicodeConverter.ToGB2312(code);
        var parameter = eval('(' + userInfo + ')');
        // var arr = Object.keys(parameter);   对象转数组 很牛逼的
        alert('openid=' + parameter.openId)
        alert('mobile=' + parameter.mobile)
        alert('token=' + parameter.token)
        sessionStorage.setItem('finTechInfo', parameter.token);
        if (!parameter.loginFlag) {
            alert('我是第一次登入的！！！');
            setTimeout(function () {
                removeLoading('test1');
                $state.go('login', {openId: parameter.openId})
            }, 2000);
        } else {
            alert('不是第一次');
            $state.go('app.entAccount', {mobile: parameter.mobile})
        }
    }])
})();