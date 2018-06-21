(function () {
    'use strict';

    app.controller('loginCtrl', ['$rootScope', '$scope', '$state', 'REST', function ($rootScope, $scope, $state, REST) {
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

        $scope.getCode = function (ev) {
            // $('body').loading({
            //     title:'请稍等',
            //     name:'test1',
            //     discription:'正在获取..',
            // });

            setTimeout(function(){
                removeLoading('test1');
            },1000);
            btn = ev.target;
            console.log(btn.innerHTML);
            btn.disabled = true;
            btn.innerHTML = second + '秒后可重新获取';
            clock = setInterval(doLoop, 1000);
        };

        $scope.login = function (name, pwd) {
            $('body').loading({
                title:'请稍等',
                name:'test',
                discription:'数据加载中..',
            });

            setTimeout(function(){
                $state.go('app.entAccount');
                removeLoading('test');
            },1000);
        };
    }])
})();