(function () {
    'use strict';

    app.controller('loginCtrl', ['$window', '$rootScope', '$scope', '$state', '$http', 'REST', 'RS','$stateParams', function ($window, $rootScope, $scope, $state, $http, REST, RS,$stateParams) {
        var clock = '';
        var second = 60;
        var btn;
        var openId = sessionStorage.getItem('finTechInfo-openId');
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

        $scope.getCode = function (ev, mobile) {
            btn = ev.target;
            if (!mobile) {
                REST.pop('请输入手机号');
            } else {
                REST.login('app/appLogin/appLogin?mobile=' + mobile + '&openId=' + openId).then(function (res) {
                    btn.disabled = true;
                    btn.innerHTML = second + '秒后可重新获取';
                    clock = setInterval(doLoop, 1000);
                }, function (res) {
                    clearInterval(clock);
                    btn.disabled = false;
                    btn.innerHTML = '获取验证码';
                    second = 60;
                    setTimeout(function () {
                        removeLoading('test1');
                    }, 2000);
                })
            }
        };
        $scope.login = function (mob, cod) {
            if (!mob) {
                REST.pop('请输入手机号');
            } else if (!cod) {
                REST.pop('请输入验证码');
            } else if (!mob && !cod) {
                REST.pop('请输入信息');
            } else {
                REST.login('app/appLogin/appLoginVerification?mobile=' + mob + '&code=' + cod + '&openId=' + openId).then(function (res) {
                    $state.go('app.entAccount', {mobile: mob,token:res.data});
                })
            }
        };
    }])
})();