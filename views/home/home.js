/**
 *  Created by fangQing on 2018/06/13.
 */
(function () {
    'use strict';

    app
        .controller('homeCtrl', ['REST', '$timeout', '$state', '$scope', '$stateParams', '$window', function (REST, $timeout, $state, $scope, $stateParams, $window) {
            var vm = this;
            var token = sessionStorage.getItem('finTechInfo') == undefined ? REST.sessionParam('token', $stateParams.token == "" ? '' : $stateParams.token) : sessionStorage.getItem('finTechInfo');
            var orderId = sessionStorage.getItem('orderId') == undefined ? REST.sessionParam('orderId', $stateParams.orderId == "" ? '' : $stateParams.orderId) : sessionStorage.getItem('orderId');
            var mobile = sessionStorage.getItem('mobile') == undefined ? REST.sessionParam('mobile', $stateParams.mobile == "" ? '' : $stateParams.mobile) : sessionStorage.getItem('mobile');
            // alert('token==' + token);
            // alert('orderId==' + orderId);
            // alert('mobile==' + mobile);
            var windowHeight = $window.innerHeight; //获取窗口高度
            $scope.objHeight = {
                "height": windowHeight - 120
            };
            vm.handle = {
                nextStep: nextStep
            };
            toMoxieCarrierH5();

            function toMoxieCarrierH5() {
                REST.get('app/moxie/toMoxieCarrierH5?orderId=' + orderId + '&token=' + token).then(function (res) {
                    $("#object").attr('data', res.data)
                })
            }

            function nextStep() {
                $('body').loading({
                    title: '请稍等',
                    name: 'test',
                    discription: '数据加载中..'
                });
                REST.get('app/moxie/resultMoxie?orderId=' + orderId).then(function (value) {
                    // alert(value.data.toString() =='000000');
                    if(value.data.toString() == '000000'){
                        setTimeout(function () {
                            $state.go('app.perInforma', {mobile: mobile, orderId: orderId, token: token});
                            removeLoading('test');
                        }, 1000);
                    }else {
                        REST.pop('正在认证中');
                        setTimeout(function () {
                            removeLoading('test');
                        }, 1000);
                    }
                    // alert('valuedata' + value.data);
                    // alert('value.data' + value.data === '000000');
                    // if (value.data === '000000') {
                    //     alert('回调成功');
                    //     setTimeout(function () {
                    //         $state.go('app.perInforma', {mobile: mobile, orderId: orderId, token: token});
                    //         removeLoading('test');
                    //     }, 1000);
                    // }
                }, function (reason) {
                    REST.pop('正在认证中');
                    setTimeout(function () {
                        removeLoading('test');
                    }, 1000);
                });
            }
        }])
})();