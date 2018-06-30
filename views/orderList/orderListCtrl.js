/**
 *  Created by fangQing on 2018/06/17.
 */
(function () {
    'use strict';

    app
        .controller('orderListCtrl', ['REST', '$timeout', '$state', '$scope', '$stateParams', 'currencyFilter',function (REST, $timeout, $state, $scope, $stateParams,currencyFilter) {
            var token = sessionStorage.getItem('finTechInfo') == undefined ? REST.sessionParam('token', $stateParams.token == "" ? '' : $stateParams.token) : sessionStorage.getItem('finTechInfo') ;
            var orderId = sessionStorage.getItem('orderId') == undefined ? REST.sessionParam('orderId', $stateParams.orderId == "" ? '' : $stateParams.orderId) : sessionStorage.getItem('orderId') ;
            var mobile = sessionStorage.getItem('mobile') == undefined ? REST.sessionParam('mobile', $stateParams.mobile == "" ? '' : $stateParams.mobile) : sessionStorage.getItem('mobile') ;
            // alert('token=='+token);
            // alert('orderId=='+orderId);
            // alert('mobile=='+mobile);
            var vm = this;
            vm.handle = {
                goDetail: goDetail,
                formatMoney:formatMoney
            };

            initOrderList();

            function initOrderList() {
                REST.get('app/orderbaseinfo/orderBaseinfos?token=' + token).then(function (res) {
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
                        $state.go('app.orderDetail',{mobile:mobile,orderId:orderId,token:token});
                        removeLoading('test');
                    }, 1000);
                }else {
                    setTimeout(function () {
                        $state.go('app.entAccount',{mobile:mobile,orderId:orderId,token:token});
                        removeLoading('test');
                    }, 1000);
                }
            }
            function formatMoney(val) {
                return val ? currencyFilter(val, '￥') : '-'
            }
        }])
})();