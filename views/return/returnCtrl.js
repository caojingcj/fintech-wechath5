/**
 *  Created by fangQing on 2018/06/26.
 */
(function () {
    'use strict';

    app
        .controller('returnCtrl', ['REST', '$timeout', '$state', '$scope', function (REST, $timeout, $state, $scope) {
            var  vm =this;
            vm.handle = {
            };

            vm.dataList = [];

            initReturnList();

            function initReturnList() {
                REST.get('app/orderbaseinfo/userReturnplans?').then(function (res) {
                    console.log(res);
                    vm.dataList = res.data.userReturnplan;
                })
            }

        }])
})();