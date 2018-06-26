(function () {
    'use strict';

    app.controller('loginCtrl', ['$rootScope', '$scope', '$state', '$http', 'REST', function ($rootScope, $scope, $state, $http, REST) {
        var clock = '';
        var second = 60;
        var btn;

        function doLoop() {
            second--;
            if (second > 0) {
                btn.innerHTML = second + '秒后可重新获取';
            } else {
                clearInterval(clock);
                btn.disabled = false;
                btn.innerHTML = '获取验证码';
                second = 60;
            }
        }

        $scope.getCode = function (ev, code) {
            btn = ev.target;
            REST.login('app/appLogin/appLogin?mobile=' + code).then(function (res) {
                $('body').loading({
                    title: '请稍等',
                    name: 'test1',
                    discription: res.message + ',请注意查收'
                });
                setTimeout(function () {
                    removeLoading('test1');
                }, 2000);
                btn.disabled = true;
                btn.innerHTML = second + '秒后可重新获取';
                clock = setInterval(doLoop, 1000);
            }, function (res) {
                REST.pop('error', null, res.message, 1500);
                clearInterval(clock);
                btn.disabled = false;
                btn.innerHTML = '获取验证码';
                second = 60;
            })
        };
        $scope.login = function (mob, cod) {
                $('body').loading({
                    title: '请稍等',
                    name: 'test1',
                    discription: '正在加载中..'
                });
                setTimeout(function () {
                    $state.go('app.entAccount',{data:mob});
                    removeLoading('test1');
                }, 1000);
            // REST.login('app/appLogin/appLoginVerification?mobile=' + mob + '&code=' + cod).then(function (res) {
            //     $('body').loading({
            //         title: '请稍等',
            //         name: 'test1',
            //         discription: '正在加载中..'
            //     });
            //     setTimeout(function () {
            //         $state.go('app.entAccount',{data:mob});
            //         removeLoading('test1');
            //     }, 1000);
            // })
        };
    }])
})();