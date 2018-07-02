/**
 *  Created by fangqing on 2017/12/21.
 */

(function () {
    'use strict';

    app.controller('waitingCtrl', ['$window', '$rootScope', '$scope', '$state', '$http', 'REST', 'RS', function ($window, $rootScope, $scope, $state, $http, REST, RS) {
        $('body').loading({
            title: '请稍等',
            name: 'test1',
            discription: '加载中'
        });

        var GB2312UnicodeConverter = {
            ToGB2312: function (str) {
                return unescape(str.replace(/\\u/gi, '%u'));
            }
        };
        var code;
        var url = $window.location.href;
        var aa = url.split('?');
        for (var i = 0; i < aa.length; i++) {
            if (i === 1) {
                code = aa[i];
            }
        }
        var userInfo = GB2312UnicodeConverter.ToGB2312(code);
        var parameter = eval('(' + userInfo + ')');
        // var arr = Object.keys(parameter);   对象转数组 很牛逼的
        sessionStorage.setItem('finTechInfo-openId', parameter.openId);
        sessionStorage.setItem('finTechInfo', parameter.token);
        sessionStorage.setItem('orderId', parameter.orderId);
        sessionStorage.setItem('mobile', parameter.mobile);
        sessionStorage.setItem('loginFlag', parameter.loginFlag);
        if (parameter.pageStatus === 2) {   //点击的是我的订单
            setTimeout(function () {
                removeLoading('test1');
                $state.go('app.orderList', {openId: parameter.openId})
            }, 2000);
        } else if (parameter.pageStatus === 1) {
            //点击的是我要进件
            if (!parameter.loginFlag) {
                // alert('我是第一次登入的！！！');
                setTimeout(function () {
                    removeLoading('test1');
                    $state.go('login', {openId: parameter.openId})
                }, 2000);
            } else {
//      	操作类型00扫码01项目信息填写02身份信息认证03运营商认证04个人信息填写05附件上传06签署合同91审批11取消12退款13提前结清99结清09取消确认81取消驳回
                if (parameter.orderStatus === '00') {
                    if (parameter.orderOperation === '00') {
                        setTimeout(function () {
                            removeLoading('test1');
                            $state.go('app.entAccount', {mobile: parameter.mobile})
                        }, 2000);

                    } else if (parameter.orderOperation === '01') {
                        setTimeout(function () {
                            removeLoading('test1');
                            $state.go('app.createAccount', {mobile: parameter.mobile})
                        }, 2000);
                    } else if (parameter.orderOperation === '02') {
                        setTimeout(function () {
                            removeLoading('test1');
                            $state.go('app.home', {mobile: parameter.mobile})
                        }, 2000);

                    } else if (parameter.orderOperation === '03') {
                        setTimeout(function () {
                            removeLoading('test1');
                            $state.go('app.perInforma', {mobile: parameter.mobile})
                        }, 2000);

                    } else if (parameter.orderOperation === '04') {
                        setTimeout(function () {
                            removeLoading('test1');
                            $state.go('app.medical', {mobile: parameter.mobile})
                        }, 2000);
                    } else if (parameter.orderOperation === '05') {
                        setTimeout(function () {
                            removeLoading('test1');
                            $state.go('app.contract', {mobile: parameter.mobile})
                        }, 2000);

                    }else {
                        setTimeout(function () {
                            removeLoading('test1');
                            $state.go('app.entAccount', {mobile: parameter.mobile})
                        }, 2000);
                    }
                }else {
                    setTimeout(function () {
                        removeLoading('test1');
                        $state.go('app.entAccount', {mobile: parameter.mobile})
                    }, 2000);
                }
            }
        } else if(parameter.pageStatus === 3){
            //点击的我要还款
            setTimeout(function () {
                removeLoading('test1');
                $state.go('app.return', {mobile: parameter.mobile})
            }, 2000);
        }else {
            REST.pop('无法获取当前pageStatus,无法进行调转');
            setTimeout(function () {
                removeLoading('test1');
            }, 2000);
        }

    }])
})();