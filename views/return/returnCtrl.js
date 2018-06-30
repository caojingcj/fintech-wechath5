/**
 *  Created by fangQing on 2018/06/26.
 */
(function () {
    'use strict';

    app
        .controller('returnCtrl', ['REST', '$timeout', '$state', '$scope', function (REST, $timeout, $state, $scope) {
            var orderId = sessionStorage.getItem('orderId');
            var token = sessionStorage.getItem('finTechInfo');
            alert('缓存获取token= '+token);
            alert('orderId= '+orderId);
            var  vm =this;
            vm.handle = {
            };

            vm.dataList = [];

            initReturnList();

            function initReturnList() {
                REST.get('app/orderbaseinfo/userReturnplans?token=' + token).then(function (res) {
                    vm.dataList = res.data.userReturnplan;
                })
            }

        }])
})();