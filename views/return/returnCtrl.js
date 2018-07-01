/**
 *  Created by fangQing on 2018/06/26.
 */
(function () {
    'use strict';

    app
        .controller('returnCtrl', ['REST', '$timeout', '$state', '$scope', function (REST, $timeout, $state, $scope) {
            var orderId = sessionStorage.getItem('orderId');
            var token = sessionStorage.getItem('finTechInfo');
            var loginFlag = sessionStorage.getItem('loginFlag') ;
            if(loginFlag === 'false'){
                $state.go('login');
            }
            var  vm =this;
            vm.handle = {
            };
            vm.dataList = [];
            initReturnList();
            vm.code = true;
            function initReturnList() {
                REST.get('app/orderbaseinfo/userReturnplans?token=' + token).then(function (res) {
                    vm.dataList = res.data.userReturnplan;
                },function (reason) {
                    vm.code = false;
                })
            }

        }])
})();