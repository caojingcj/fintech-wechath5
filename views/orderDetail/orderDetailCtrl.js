/**
 *  Created by fangQing on 2018/06/17.
 */
(function () {
    'use strict';

    app
        .controller('orderDetailCtrl', ['REST', '$timeout', '$state', '$scope', function (REST, $timeout, $state, $scope) {
            var vm = this;
            vm.handle = {
                goStep: goStep
            };

            vm.dataList = ({
                "dataList": [{
                    "companyName": "1",
                    "name": "眼部整形",
                    "seq": "9",
                    "sendMoney": "35000",
                    "orderState": '00',
                    "orderTime": '2018-12-12 12:12:12',
                    "state":'1'
                },
                    {
                        "companyName": "2",
                        "name": "眼部整形",
                        "seq": "9",
                        "sendMoney": "35000",
                        "orderState": '01',
                        "orderTime": '2018-12-12 12:12:12',
                        "state":'2'
                    },
                    {
                        "companyName": "3",
                        "name": "眼部整形",
                        "seq": "02",
                        "sendMoney": "35000",
                        "orderState": '02',
                        "orderTime": '2018-12-12 12:12:12',
                        "state":'0'
                    }]
            });


            vm.orderState = {
                "companyName": "上海美莱",
                "name": "眼部整形",
                "seq": "9",
                "sendMoney": "35000",
                "orderState": '05',
                "orderTime": '2018-12-12 12:12:12'
            };
            console.log(vm.dataList.dataList);

            function goStep() {
                $state.go('app.contract');
            }
        }])
})();