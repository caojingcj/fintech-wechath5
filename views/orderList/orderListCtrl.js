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
                    vm.data = res.data;
                })
            }



            function goDetail(num) {
                $('body').loading({
                    title: '请稍等',
                    name: 'test',
                    discription: '数据加载中..'
                });
                if(num === '05'){
                    setTimeout(function () {
                        $state.go('app.orderDetail',{mobile:mobile,order:order});
                        removeLoading('test');
                    }, 1000);
                }else {
                    setTimeout(function () {
                        $state.go('app.entAccount',{mobile:mobile,order:order});
                        removeLoading('test');
                    }, 1000);
                }
            }
            function formatMoney(val) {
                return val ? currencyFilter(val, '￥') : '-'
            }
        }])
})();