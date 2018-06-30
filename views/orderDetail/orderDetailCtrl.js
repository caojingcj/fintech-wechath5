/**
 *  Created by fangQing on 2018/06/17.
 */
(function () {
    'use strict';
    app
        .controller('orderDetailCtrl', ['REST', '$timeout', '$state', '$scope','$stateParams','currencyFilter', function (REST, $timeout, $state, $scope,$stateParams,currencyFilter) {
            var token = sessionStorage.getItem('finTechInfo') == undefined ? REST.sessionParam('token', $stateParams.token == "" ? '' : $stateParams.token) : sessionStorage.getItem('finTechInfo') ;
            var orderId = sessionStorage.getItem('orderId') == undefined ? REST.sessionParam('orderId', $stateParams.orderId == "" ? '' : $stateParams.orderId) : sessionStorage.getItem('orderId') ;
            var mobile = sessionStorage.getItem('mobile') == undefined ? REST.sessionParam('mobile', $stateParams.mobile == "" ? '' : $stateParams.mobile) : sessionStorage.getItem('mobile') ;
            // alert('token=='+token);
            // alert('orderId=='+orderId);
            // alert('mobile=='+mobile);
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
                REST.get('app/orderbaseinfo/orderBaseinfoDetail?orderId=' + orderId +'&token=' + token).then(function (res) {
                    vm.dataList = res.data.userReturnplan;
                    vm.orderInfo = res.data.orderBaseInfo;
                })
            }

            function goStep() {
                $state.go('app.contract');
            }

            function formatMoney(val) {
                return val ? currencyFilter(val, '￥') : '-'
            }
        }])
})();