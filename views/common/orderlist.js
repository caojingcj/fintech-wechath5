/**
 *  Created by fangqing on 2017/12/21.
 */
(function () {
    'use strict';

    app.controller('orderlistCtrl', ['$window', '$rootScope', '$scope', '$state', '$http', 'REST', 'RS', function ($window, $rootScope, $scope, $state, $http, REST, RS) {
        $('body').loading({
            title: '请稍等',
            name: 'test1',
            discription: '加载中订单中'
        });

        // alert(11)

        var GB2312UnicodeConverter = {
            ToGB2312: function (str) {
                return unescape(str.replace(/\\u/gi, '%u'));
            }
        };
        var code;
        var url = $window.location.href;

        var aa = url.split('?');
        for (var i = 0; i < aa.length; i++) {
            if (i === 1) {
                code = aa[i];
            }
        }
        var userInfo = GB2312UnicodeConverter.ToGB2312(code);
        // alert(userInfo);

        var parameter = eval('(' + userInfo + ')');
        // var arr = Object.keys(parameter);   对象转数组 很牛逼的
        sessionStorage.setItem('finTechInfo-openId',parameter.openId);
        sessionStorage.setItem('finTechInfo',parameter.token);
        sessionStorage.setItem('orderId',parameter.orderId);
        sessionStorage.setItem('mobile',parameter.mobile);
        // alert('token====' + parameter.token)
        // alert(parameter.openId);
        // alert(parameter.token);
        if (!parameter.loginFlag) {
            // alert('我是第一次登入的！！！');
            setTimeout(function () {
                removeLoading('test1');
                $state.go('login', {openId: parameter.openId})
            }, 2000);
        } else {
            setTimeout(function () {    // 直接去列表页面
                removeLoading('test1');
                $state.go('app.orderList', {openId: parameter.openId})
            }, 2000);

        }
    }])
})();