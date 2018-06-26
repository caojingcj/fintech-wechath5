/**
 *  Created by fangQing on 2018/06/14.
 */
(function () {
    'use strict';

    app
        .controller('entAccountCtrl', ['REST', '$timeout', '$state', '$scope', '$compile', '$stateParams', function (REST, $timeout, $state, $scope, $compile, $stateParams) {
            var vm = this;
            var mobile = REST.sessionParam('data', $stateParams.data === "" ? null : $stateParams.data);
            vm.handle = {
                goStep: goStep
            };

            vm.initArry = {
                companyChannelName: [],      // 咨询师
                itemName: [],                // 项目
                totalPeriod: []              // 申请期数
            };

            initCompany();

            vm.parameter = {
                companyName: '',        // 商户名
                itemName: '',           // 项目名称
                itemCode: '',           // 项目编号
                orderAmount: '',        // 申请金额
                totalPeriod: '',        // 申请期数
                companyChannelName: '', // 咨询师名称
                companyChannelId: '',   // 咨询师编号
                orderId: '',            // 订单编号
                companyId: ''           // 商户编号
            };

            function initCompany() {
                REST.get('app/orderbaseinfo/scanPiece?mobile=' + mobile).then(function (res) {
                    vm.initArry.companyChannelName = res.data.channels;
                    vm.initArry.totalPeriod = res.data.periodFee;
                    vm.initArry.itemName = res.data.items;
                    vm.parameter.orderId = res.data.order.orderId;
                    vm.parameter.companyId = res.data.order.companyId
                })
            }

            function goStep(data) {
                console.log(vm.parameter);
                REST.pop('error', null,'哈哈哈哈哈', 200);
                // REST.get('app/appLogin/appLoginVerification?').then(function (res) {
                //
                // });
                // $('body').loading({
                //     title:'请稍等',
                //     name:'test',
                //     discription:'数据加载中..',
                // })
                //
                //
                // setTimeout(function(){
                //     $state.go('app.createAccount');
                //     removeLoading('test');
                // },1000);
            }
        }])
})();