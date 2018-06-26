/**
 *  Created by fangQing on 2018/06/17.
 */
(function () {
    'use strict';

    app
        .controller('contractCtrl', ['REST', '$timeout', '$state', '$scope', '$window','$stateParams',function (REST, $timeout, $state, $scope,$window,$stateParams) {
            var mobile = REST.sessionParam('mobile', $stateParams.mobile === "" ? null : $stateParams.mobile);
            var order = REST.sessionParam('order', $stateParams.order === "" ? null : $stateParams.order);
            var  vm =this;
            vm.handle = {
                nextStep:nextStep
            };

            vm.initInfo = {
                contractId : '',                //合同编号
                signingTime : '',               //签署日期
                partyaName : '',                //甲方姓名
                partyacorporatename : '',       //甲方法定代表人
                partyacompanyaddr : '',         //甲方地址
                partyacompanyaccountname : '',  //甲方开户行名称
                partyacompanyaccountno : '',    //甲方帐号
                companyname : '',               //乙方姓名
                corporatename : '',             //乙方法定代表人
                companyaddr : '',               //乙方地址
                companyaccountname : '',        //乙方开户行名称
                companyaccountbranch	 : '',  //乙方开户行
                companyaccountno : '',          //乙方帐号
                itemname : '',                  //商品/服务内容
                orderamount : '',               //分期本金
                partyaname : ''                 //甲方签字
            };

            initContract();

            function initContract() {
                REST.get('app/orderbaseinfo/previewCaOrder?orderId=' + order).then(function (res) {
                    console.log(res);
                    vm.data = res.data;
                })
            }

            function nextStep() {
                REST.get('/app/orderbaseinfo/remoteSignCaOrder?orderId=' + order).then(function (res) {
                    if(res.code === '000000'){
                        $('body').loading({
                            title:'请稍等',
                            name:'test',
                            discription:'正在签署协议..'
                        });

                        setTimeout(function(){
                            $state.go('app.orderList',{mobile:mobile,order:order});
                            removeLoading('test');
                        },1500);
                    }
                });
            }
        }])
})();