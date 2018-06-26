/**
 *  Created by fangQing on 2018/06/26.
 */
(function () {
    'use strict';

    app
        .controller('returnCtrl', ['REST', '$timeout', '$state', '$scope', function (REST, $timeout, $state, $scope) {
            var  vm =this;
            vm.handle = {
            };

            vm.dataList = ({
                "dataList": [{
                    "companyName": "1",
                    "name": "眼部整形",
                    "seq": "9",
                    "sendMoney": "35000",
                    "orderState": '00',
                    "orderTime": '2018-12-12 12:12:12',
                    "state":'1',
                    "contractNumber":'YLFQYMFQ20180626722427',

                },
                    {
                        "companyName": "2",
                        "name": "眼部整形",
                        "seq": "9",
                        "sendMoney": "35000",
                        "orderState": '01',
                        "orderTime": '2018-12-12 12:12:12',
                        "state":'2',
                        "contractNumber":'YLFQYMFQ20180626722427',
                    },
                    {
                        "companyName": "3",
                        "name": "眼部整形",
                        "seq": "02",
                        "sendMoney": "35000",
                        "orderState": '02',
                        "orderTime": '2018-12-12 12:12:12',
                        "state":'0',
                        "contractNumber":'YLFQYMFQ20180626722427',
                    }]
            });

        }])
})();