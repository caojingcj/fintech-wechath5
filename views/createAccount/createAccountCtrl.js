/**
 *  Created by fangQing on 2018/06/14.
 */
(function () {
    'use strict';

    app
        .controller('createAccountCtrl', ['REST', '$timeout', '$state', '$scope', '$stateParams', 'RS', function (REST, $timeout, $state, $scope, $stateParams, RS) {
            var vm = this;
            var token = sessionStorage.getItem('finTechInfo') == undefined ? REST.sessionParam('token', $stateParams.token == "" ? '' : $stateParams.token) : sessionStorage.getItem('finTechInfo');
            var orderId = sessionStorage.getItem('orderId') == undefined ? REST.sessionParam('orderId', $stateParams.orderId == "" ? '' : $stateParams.orderId) : sessionStorage.getItem('orderId');
            var mobile = sessionStorage.getItem('mobile') == undefined ? REST.sessionParam('mobile', $stateParams.mobile == "" ? '' : $stateParams.mobile) : sessionStorage.getItem('mobile');
            vm.handle = {
                nextStep: nextStep,
                uploadPhotos: uploadPhotos
            };
            REST.get('app/weixin/wxJSSignature?token=' + token).then(function (value) {
                vm.data = value.data;
                console.log("请求微信配置返回数据：", vm.data);
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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

                    console.log("Weixin jsdk error", res);
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });
            });

            // });
            vm.facadeIdCard = '';  						//zheng   finTechInfo-openId
            vm.identityCard = '';   					//fan

            vm.facadeIdCardFlag = false;  				//控制正面已经上传
            vm.identityCardFlag = false;  				//控制饭面已经上传

            vm.data = {
                orderId: orderId
            };
            vm.wxConfig = {};

            function uploadPhotos(url, num) {
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        console.log('localIds的值是' + localIds);
                        uploadImage(localIds, url, num);
                    },
                    fail: function () {
                    },
                    complete: function () {
                    }
                });
            }

            function uploadImage(localIds, url, num) {
                wx.uploadImage({
                    localId: localIds[0], 					// 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, 					// 默认为1，显示进度提示
                    success: function (res) {
                        var serverId = res.serverId; 		// 返回图片的服务器端ID
                        console.log('serverId的值是' + serverId);
                        $.ajax({
                            crossDomain: true,
                            type: "post",
                            url: RS.ip + url,
                            async: false,
                            contentType: false, 				//这个一定要写
                            processData: false, 				//这个也一定要写，不然会报错
                            data: {
                                serverId: serverI,
                                token: token
                            },
                            dataType: 'text',
                            success: function (data) {
                                REST.pop('上传成功');
                                if (num === 1) {
                                    vm.facadeIdCardFlag = true;  				//控制正面已经上传
                                } else {
                                    vm.identityCardFlag = true;  				//控制饭面已经上传
                                }
                                // REST.pop(JSON.parse(data).message);
                                // if (JSON.parse(data).code === '000000') {
                                //     vm.facadeIdCardInfo = JSON.parse(data).data;
                                //     vm.facadeIdCard = JSON.parse(data).data.custIdCardFront;
                                //     vm.facadeIdCardFlag = true;
                                // }
                                setTimeout(function () {
                                    removeLoading('test1');
                                }, 2000);
                            }
                        });
                    }
                });
            }

            function nextStep() {
                alert(vm.facadeIdCardFlag);
                alert(vm.identityCardFlag);
                if (vm.facadeIdCardFlag && vm.identityCardFlag) {
                    $('body').loading({
                        title: '请稍等',
                        name: 'test1',
                        discription: '加载中'
                    });
                    setTimeout(function () {
                        removeLoading('test1');
                        $state.go('app.home', {mobile: mobile, orderId: orderId, token: token});
                    }, 2000);
                } else {
                    setTimeout(function () {
                        removeLoading('test1');
                    }, 2000);
                    REST.pop('请确认照片是否传完')
                }
            }
        }])
})();