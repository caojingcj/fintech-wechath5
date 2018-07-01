/**
 *  Created by fangQing on 2018/06/17.
 */
(function () {
    'use strict';

    app
        .controller('medicalCtrl', ['REST', '$timeout', '$state', '$scope', 'RS', '$stateParams', function (REST, $timeout, $state, $scope, RS, $stateParams) {
            var token = sessionStorage.getItem('finTechInfo') == undefined ? REST.sessionParam('token', $stateParams.token == "" ? '' : $stateParams.token) : sessionStorage.getItem('finTechInfo');
            var orderId = sessionStorage.getItem('orderId') == undefined ? REST.sessionParam('orderId', $stateParams.orderId == "" ? '' : $stateParams.orderId) : sessionStorage.getItem('orderId');
            var mobile = sessionStorage.getItem('mobile');
            var vm = this;
            vm.handle = {
                goStep: goStep,
                upPic: upPic
            };
            vm.flag = false;
            REST.get('app/weixin/wxJSSignature?token=' + token).then(function (value) {
                vm.data = value.data;
                console.log("请求微信配置返回数据：", vm.data);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: vm.data.appId, // 必填，公众号的唯一标识
                    timestamp: vm.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: vm.data.noncestr, // 必填，生成签名的随机串
                    signature: vm.data.signature,// 必填，签名，见附录1
                    jsApiList: [
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'translateVoice',
                        'downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                wx.ready(function (res) {
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    //验证客户端是否支持js接口
                    wx.checkJsApi({
                        jsApiList: [
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                        success: function (res) {
                            console.log("checked api: ", res);
                        },
                        fail: function (res) {
                            console.log("check api fail: ", res)
                        }
                    });
                });
                wx.error(function (res) {
                    REST.pop('config配置错误');
                    console.log("Weixin jsdk error", res);
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });
            });

            function upPic() {
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        uploadImageF(res.localIds);
                    },
                    fail: function () {
                    },
                    complete: function () {
                    }
                });
            }

            vm.orderStatus = '';

            function uploadImageF(localIds) {
                wx.uploadImage({
                    localId: localIds.toString(), 	// 需要上传的图片的本地ID，由chooseImage接口获得   真你吗坑老子 草
                    isShowProgressTips: 1, 					// 默认为1，显示进度提示
                    success: function (res) {
                        var data = {
                            token: token,
                            orderId: orderId,
                            serverId: res.serverId,
                            attchType: 0
                        };

                        REST.get('app/orderbaseinfo/saveOrderAttachment?', data).then(function (value) {
                            // alert('成功回调');
                            vm.orderStatus = value.data.orderStatus;
                            // alert(vm.orderStatus);
                            // $(".medicalList").text('已上传').css("color", "#0d8ddb");//控制饭面已经上传
                            vm.flag = true;
                            REST.pop(value.message);
                        })
                    },
                    fail: function (res) {
                        // alert('错误回调==' + res)
                    }
                });
            }

            function goStep() {
                if (vm.flag) {
                    $('body').loading({
                        title: '请稍等',
                        name: 'test',
                        discription: '数据加载中..'
                    });
                    if (vm.orderStatus === '01' || vm.orderStatus === '03') {
                        setTimeout(function () {
                            $state.go('app.orderList', {mobile: mobile, orderId: orderId, token: token});  //待审批   跳转到订单列表 状态是带审批
                            removeLoading('test');
                        }, 1000);
                    } else if (vm.orderStatus === '04') {
                        setTimeout(function () {
                            $state.go('app.contract', {mobile: mobile, orderId: orderId, token: token});  //待用户签署   跳转到签署页面
                            removeLoading('test');
                        }, 1000);
                    }
                } else {
                    REST.pop('请上传附件');
                }
            }
        }])
})();