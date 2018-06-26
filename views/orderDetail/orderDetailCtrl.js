/**
 *  Created by fangQing on 2018/06/17.
 */
(function () {
    'use strict';
    app
        .controller('orderDetailCtrl', ['REST', '$timeout', '$state', '$scope','$stateParams','currencyFilter', function (REST, $timeout, $state, $scope,$stateParams,currencyFilter) {
            var mobile = REST.sessionParam('mobile', $stateParams.mobile === "" ? null : $stateParams.mobile);
            var order = REST.sessionParam('order', $stateParams.order === "" ? null : $stateParams.order);
            console.log(order);
            var vm = this;
            vm.handle = {
                goStep: goStep,
                formatMoney:formatMoney
            };

            vm.dataList = [];

            initOrderDetail();

            $scope.gooo = function () {
                $state.go('app.return');
            };

            function initOrderDetail() {
                REST.get('app/orderbaseinfo/orderBaseinfoDetail?orderId=' + order).then(function (res) {
                    console.log(res);
                    vm.dataList = res.data.userReturnplan;
                    vm.orderInfo = res.data.orderBaseInfo;
                    console.log(vm.orderInfo);
                })
            }


            vm.orderState = {
                "companyName": "上海美莱",
                "name": "眼部整形",
                "seq": "9",
                "sendMoney": "35000",
                "orderState": '05',
                "orderTime": '2018-12-12 12:12:12'
            };
            console.log(vm.dataList.dataList);

            function goStep() {
                $state.go('app.contract');
            }

            function formatMoney(val) {
                return val ? currencyFilter(val, '￥') : '-'
            }
        }])
})();