/**
 *  Created by fangQing on 2018/06/17.
 */
(function () {
    'use strict';

    app
        .controller('orderListCtrl', ['REST', '$timeout', '$state', '$scope', function (REST, $timeout, $state, $scope) {
            var  vm =this;
            vm.handle = {
                goDetail:goDetail
            };

            $scope.dataList = ({
                "dataList": [{
                    "companyName": "上海美莱",
                    "name": "眼部整形",
                    "seq": "9",
                    "sendMoney": "35000",
                    "orderState": '00',
                    "orderTime": '2018-12-12 12:12:12'
                },
                    {
                        "companyName": "上海美莱",
                        "name": "眼部整形",
                        "seq": "9",
                        "sendMoney": "35000",
                        "orderState": '01',
                        "orderTime": '2018-12-12 12:12:12'
                    },
                    {
                        "companyName": "上海美莱",
                        "name": "眼部整形",
                        "seq": "02",
                        "sendMoney": "35000",
                        "orderState": '02',
                        "orderTime": '2018-12-12 12:12:12'
                    },
                    {
                        "companyName": "上海美莱",
                        "name": "眼部整形",
                        "seq": "02",
                        "sendMoney": "35000",
                        "orderState": '03',
                        "orderTime": '2018-12-12 12:12:12'
                    },
                    {
                        "companyName": "上海美莱",
                        "name": "眼部整形",
                        "seq": "02",
                        "sendMoney": "35000",
                        "orderState": '04',
                        "orderTime": '2018-12-12 12:12:12'
                    },
                    {
                        "companyName": "上海美莱",
                        "name": "眼部整形",
                        "seq": "02",
                        "sendMoney": "35000",
                        "orderState": '05',
                        "orderTime": '2018-12-12 12:12:12'
                    },
                    {
                        "companyName": "上海美莱",
                        "name": "眼部整形",
                        "seq": "02",
                        "sendMoney": "35000",
                        "orderState": '11',
                        "orderTime": '2018-12-12 12:12:12'
                    },
                    {
                        "companyName": "上海美莱",
                        "name": "眼部整形",
                        "seq": "02",
                        "sendMoney": "35000",
                        "orderState": '12',
                        "orderTime": '2018-12-12 12:12:12'
                    },
                    {
                        "companyName": "上海美莱",
                        "name": "眼部整形",
                        "seq": "02",
                        "sendMoney": "35000",
                        "orderState": '13',
                        "orderTime": '2018-12-12 12:12:12'
                    },
                    {
                        "companyName": "上海美莱",
                        "name": "眼部整形",
                        "seq": "02",
                        "sendMoney": "35000",
                        "orderState": '99',
                        "orderTime": '2018-12-12 12:12:12'
                    }]
            });

            function goDetail() {
                $('body').loading({
                    title:'请稍等',
                    name:'test',
                    discription:'数据加载中..',
                });

                setTimeout(function(){
                    $state.go('app.orderDetail')
                    removeLoading('test');
                },1000);
            }
        }])
})();