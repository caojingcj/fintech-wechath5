/**
 *  Created by fangQing on 2018/06/17.
 */
(function () {
    'use strict';

    app
        .controller('contractCtrl', ['REST', '$timeout', '$state', '$scope', '$window', '$stateParams', function (REST, $timeout, $state, $scope, $window, $stateParams) {
            var token = sessionStorage.getItem('finTechInfo') == undefined ? REST.sessionParam('token', $stateParams.token == "" ? '' : $stateParams.token) : sessionStorage.getItem('finTechInfo') ;
            var orderId = sessionStorage.getItem('orderId') == undefined ? REST.sessionParam('orderId', $stateParams.orderId == "" ? '' : $stateParams.orderId) : sessionStorage.getItem('orderId') ;
            var mobile = sessionStorage.getItem('mobile') == undefined ? REST.sessionParam('mobile', $stateParams.mobile == "" ? '' : $stateParams.mobile) : sessionStorage.getItem('mobile') ;
            // alert('token=='+token);
            // alert('orderId=='+orderId);
            // alert('mobile=='+mobile);
            var windowHeight = $window.innerHeight; //获取窗口高度
            $scope.objHeight={
                "height":windowHeight - 120
            };
            var vm = this;
            vm.handle = {
                nextStep: nextStep
            };

            vm.initInfo = {
                contractId: '',                //合同编号
                signingTime: '',               //签署日期
                partyaName: '',                //甲方姓名
                partyacorporatename: '',       //甲方法定代表人
                partyacompanyaddr: '',         //甲方地址
                partyacompanyaccountname: '',  //甲方开户行名称
                partyacompanyaccountno: '',    //甲方帐号
                companyname: '',               //乙方姓名
                corporatename: '',             //乙方法定代表人
                companyaddr: '',               //乙方地址
                companyaccountname: '',        //乙方开户行名称
                companyaccountbranch: '',      //乙方开户行
                companyaccountno: '',          //乙方帐号
                itemname: '',                  //商品/服务内容
                orderamount: '',               //分期本金
                partyaname: ''                 //甲方签字
            };

            initContract();

            function initContract() {
                REST.get('app/orderbaseinfo/previewCaOrder?orderId=' + orderId + '&token=' + token).then(function (res) {
                    vm.data = res.data;
                })
            }

            function nextStep() {
                REST.get('/app/orderbaseinfo/remoteSignCaOrder?orderId=' + orderId + '&token=' + token).then(function (res) {
                    if (res.code === '000000') {
                        $state.go('app.orderList', {mobile: mobile, orderId: orderId,token:token});
                    }
                });
            }
        }])
})();