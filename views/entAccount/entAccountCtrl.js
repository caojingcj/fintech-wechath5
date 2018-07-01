/**
 *  Created by fangQing on 2018/06/14.
 */
(function () {
    'use strict';

    app
        .controller('entAccountCtrl', ['REST', '$timeout', '$state', '$scope', '$compile', '$stateParams', '$window','RS',function (REST, $timeout, $state, $scope, $compile, $stateParams,$window,RS) {
            var vm = this;
            var mobilew = REST.sessionParam('mobile', $stateParams.mobile == "" ? '' : $stateParams.mobile) ;
            var token = sessionStorage.getItem('finTechInfo') == undefined ? REST.sessionParam('token', $stateParams.token == "" ? '' : $stateParams.token) : sessionStorage.getItem('finTechInfo') ;
            var mobile = sessionStorage.getItem('mobile') == undefined ? mobilew : sessionStorage.getItem('mobile');
            // alert(sessionStorage.getItem('finTechInfo') == undefined)
            // alert('手机号mobile='+mobile)
            // alert('token='+token)
            vm.handle = {
                goStep: goStep,
                getItemName: getItemName,
                getcompanyChannel: getcompanyChannel,
                seveInfo: seveInfo
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

            vm.data = {
                companyName: '',         // 商户名
                itemName: '',            // 项目名称
                itemCode: '',            // 项目编号
                orderAmount: '',         // 申请金额
                totalPeriod: '',         // 申请期数
                companyChannelName: '',  // 咨询师名称
                companyChannelId: '',    // 咨询师编号
                orderId: '',             // 订单编号
                companyId: '',           // 商户编号
                companyChannelPhone: '',  // 商户编号
            	token:token
            };


            function getItemName(val) {
                vm.data.itemCode = val.itemCode;
                vm.data.itemName = val.itemName;
            }

            function getcompanyChannel(val) {
                vm.data.companyChannelName = val.channelName;
                vm.data.companyChannelId = val.id;
                vm.data.companyChannelPhone = val.channelPhone

            }

            function initCompany() {
                REST.get('app/orderbaseinfo/scanPiece?mobile=' + mobile +'&token=' + token ).then(function (res) {
                    vm.initArry.companyChannelName = res.data.channels;
                    vm.initArry.totalPeriod = res.data.periodFees;
                    vm.initArry.itemName = res.data.items;
                    vm.data.orderId = res.data.order.orderId;
                    vm.data.companyId = res.data.order.companyId;
                    vm.data.companyName = res.data.order.companyName;
                    sessionStorage.setItem('orderId', res.data.order.orderId);
                    // alert(res.data.order.orderId);
                })
            }

            function seveInfo() {
                REST.post('app/orderbaseinfo/saveProject', vm.data).then(function (res) {
                    if (res.code === '000000') {
                        $('body').loading({
                            title: '请稍等',
                            name: 'test',
                            discription: '数据加载中..'
                        });
                        setTimeout(function () {
                            $state.go('app.createAccount', {mobile: mobile, order: vm.data.orderId});
                            removeLoading('test');
                        }, 1000);
                    }
                });
            }

            function goStep() {
                REST.post('app/orderbaseinfo/saveProject', vm.data).then(function (res) {
                    if (res.code === '000000') {
                        $('body').loading({
                            title: '请稍等',
                            name: 'test',
                            discription: '数据加载中..'
                        });
                        setTimeout(function () {
                            $state.go('app.createAccount', {mobile: mobile, orderId: vm.data.orderId,token:token});
                            removeLoading('test');
                        }, 1000);
                    }
                });
            }
        }])
})();