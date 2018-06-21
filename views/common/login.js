(function () {
    'use strict';

    app.controller('loginCtrl', ['$rootScope', '$scope', '$state', 'REST', function ($rootScope, $scope, $state, REST) {
            REST.logout();

        $('.loginName').focus();
        $scope.getCode = function () {
            alert();
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