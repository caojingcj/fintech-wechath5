/**
 *  Created by fangQing on 2018/06/17.
 */
(function () {
    'use strict';

    app
        .controller('perInformaCtrl', ['REST', '$timeout', '$state', '$scope','$stateParams', function (REST, $timeout, $state, $scope,$stateParams) {
            var  vm =this;
            var mobile = REST.sessionParam('mobile', $stateParams.mobile === "" ? null : $stateParams.mobile);
            var order = REST.sessionParam('order', $stateParams.order === "" ? null : $stateParams.order);
            console.log(mobile);
            vm.handle = {
                seveInfo:seveInfo
            };
            vm.initArry = {
                maritalStatus: [
                    {val:0,tit:'未婚'},
                    {val:1,tit:'已婚'},
                    {val:2,tit:'其他'}
                ],
                educationalStatus: [
                    {val:1,tit:'博士'},
                    {val:2,tit:'硕士'},
                    {val:3,tit:'本科'},
                    {val:4,tit:'专科'},
                    {val:5,tit:'高中'},
                    {val:6,tit:'中专/技校/职校'},
                    {val:7,tit:'初中'},
                    {val:8,tit:'小学'},
                ],
                vocationStatus: [
                    {val:1,tit:'自雇人士'},
                    {val:2,tit:'工薪阶层'},
                    {val:3,tit:'学生'},
                    {val:4,tit:'自由职业'},
                ]
            };

            vm.parameter={
                maritalStatus:'',
                educationalStatus:'',
                vocationStatus:'',
                commAddr:'',
                contactName:'',
                contactPhone:'',
                depositAmount:'',
                orderId:order
            };

            function seveInfo(data) {
                REST.post('app/orderbaseinfo/saveDetailinfo',data).then(function (res) {
                    if(res.code === '000000'){
                            $state.go('app.medical',{mobile:mobile,order:order});
                    }
                })
            }
        }])
})();