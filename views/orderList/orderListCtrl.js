/**
 *  Created by fangQing on 2018/06/17.
 */
(function () {
    'use strict';

    app
        .controller('orderListCtrl', ['REST', '$timeout', '$state', '$scope', '$stateParams', 'currencyFilter',function (REST, $timeout, $state, $scope, $stateParams,currencyFilter) {
            var mobile = REST.sessionParam('mobile', $stateParams.mobile === "" ? null : $stateParams.mobile);
            var order = REST.sessionParam('order', $stateParams.order === "" ? null : $stateParams.order);
            var vm = this;
            vm.handle = {
                goDetail: goDetail,
                formatMoney:formatMoney
            };

            initOrderList();

            function initOrderList() {
                REST.get('app/orderbaseinfo/orderBaseinfos?').then(function (res) {
                    console.log(res);
                    vm.data = res.data;
                    console.log(vm.data);
                })
            }

            function goDetail() {
                $('body').loading({
                    title: '请稍等',
                    name: 'test',
                    discription: '数据加载中..'
                });

                setTimeout(function () {
                    $state.go('app.orderDetail',{mobile:mobile,order:order});
                    removeLoading('test');
                }, 1000);
            }

            function formatMoney(val) {
                return val ? currencyFilter(val, '￥') : '-'
            }
        }])
})();