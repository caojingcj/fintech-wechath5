/**
 *  Created by fangQing on 2018/06/17.
 */
(function () {
    'use strict';

    app
        .controller('orderListCtrl', ['REST', '$timeout', '$state', '$scope', '$stateParams', 'currencyFilter', function (REST, $timeout, $state, $scope, $stateParams, currencyFilter) {
            var token = sessionStorage.getItem('finTechInfo') == undefined ? REST.sessionParam('token', $stateParams.token == "" ? '' : $stateParams.token) : sessionStorage.getItem('finTechInfo');
            var orderId = sessionStorage.getItem('orderId') == undefined ? REST.sessionParam('orderId', $stateParams.orderId == "" ? '' : $stateParams.orderId) : sessionStorage.getItem('orderId');
            var mobile = sessionStorage.getItem('mobile') == undefined ? REST.sessionParam('mobile', $stateParams.mobile == "" ? '' : $stateParams.mobile) : sessionStorage.getItem('mobile');
            var loginFlag = sessionStorage.getItem('loginFlag') ;
            var openId = sessionStorage.getItem('finTechInfo-openId') ;
            // alert('token=='+token);
            // alert('orderId=='+orderId);
            // alert('mobile=='+mobile);
            var vm = this;
            vm.handle = {
                goDetail: goDetail,
                formatMoney: formatMoney
            };

            initOrderList();
            vm.code = true;
            if(loginFlag === 'false'){
                $state.go('login');
            }
            function initOrderList() {
                REST.get('app/orderbaseinfo/orderBaseinfos?token=' + token).then(function (res) {
                    vm.data = res.data;
                },function (reason) {
                    vm.code = false;
                    console.log(vm.code)
                })
            }

            function goDetail(num, stat) {
                $('body').loading({
                    title: '请稍等',
                    name: 'test1',
                    discription: '数据加载中..'
                });
                if (num === '05') {   // 进详情
                    setTimeout(function () {
                        $state.go('app.orderDetail', {mobile: mobile, orderId: orderId, token: token});
                        removeLoading('test1');
                    }, 1000);
                } else if (num === '04') {  // 待用户签署   去签署页面
                    setTimeout(function () {
                        $state.go('app.contract', {mobile: mobile, orderId: orderId, token: token});
                        removeLoading('test1');
                    }, 1000);
                } else if (num === '00') {
                    //00代表是录入中的单子  操作类型00扫码01项目信息填写02身份信息认证03运营商认证04个人信息填写05附件上传06签署合同91审批11取消12退款13提前结清99结清09取消确认81取消驳回
                    if (stat === '01') {
                        setTimeout(function () {
                            removeLoading('test1');
                            $state.go('app.createAccount', {mobile: mobile})
                        }, 2000);
                    } else if (stat === '02') {
                        setTimeout(function () {
                            removeLoading('test1');
                            $state.go('app.home', {mobile: mobile})
                        }, 2000);
                    } else if (stat === '03') {
                        setTimeout(function () {
                            removeLoading('test1');
                            $state.go('app.perInforma', {mobile: mobile})
                        }, 2000);
                    } else if (stat === '04') {
                        setTimeout(function () {
                            removeLoading('test1');
                            $state.go('app.medical', {mobile: mobile})
                        }, 2000);
                    } else if (stat === '05') {
                        setTimeout(function () {
                            removeLoading('test1');
                            $state.go('app.contract', {mobile: mobile})
                        }, 2000);
                    }
                }
            }

            function formatMoney(val) {
                return val ? currencyFilter(val, '￥') : '-'
            }
        }])
})();