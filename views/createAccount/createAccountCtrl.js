/**
 *  Created by fangQing on 2018/06/14.
 */
(function () {
    'use strict';

    app
        .controller('createAccountCtrl', ['REST', '$timeout', '$state', '$scope', '$stateParams', 'RS', function (REST, $timeout, $state, $scope, $stateParams, RS) {
            var vm = this;
            $("input[type=file].voucher").fileinput({ //这里的id是input标签的id
                allowedFileExtensions: ['jpg', 'png'], // 允许的文件类型
                overwriteInitial: false,
                showPreview: false, //是否显示预览,不写默认为true
                showCaption: true, //是否显示标题
                language: 'zh', //设置语言
                maxFileSize: 5000, //文件的最大大小 5000KB=5兆
                maxFilesNum: 20, //最多文件数量
                autoReplace: false,
                showUpload: true, //是否显示上传按钮
                enctype: 'multipart/form-data',
                slugCallback: function (filename) {
                    return filename.replace('(', '_').replace(']', '_');
                }
            });
            var token = sessionStorage.getItem('finTechInfo') == undefined ? REST.sessionParam('token', $stateParams.token == "" ? '' : $stateParams.token) : sessionStorage.getItem('finTechInfo');
            var orderId = sessionStorage.getItem('orderId') == undefined ? REST.sessionParam('orderId', $stateParams.orderId == "" ? '' : $stateParams.orderId) : sessionStorage.getItem('orderId');
            var mobile = sessionStorage.getItem('mobile') == undefined ? REST.sessionParam('mobile', $stateParams.mobile == "" ? '' : $stateParams.mobile) : sessionStorage.getItem('mobile');
            // alert('token==' + token);
            // alert('orderId==' + orderId);
            // alert('mobile==' + mobile);
            vm.handle = {
                nextStep: nextStep,
                uploadPhotos: uploadPhotos,
                uploadPhotosfan: uploadPhotosfan
            };

            vm.facadeIdCard = '';  						//zheng   finTechInfo-openId
            vm.identityCard = '';   					//fan

            vm.facadeIdCardFlag = false;  				//控制正面已经上传
            vm.identityCardFlag = false;  				//控制饭面已经上传

            vm.data = {
                orderId: orderId
            };
            vm.wxConfig = {};


            //zheng
            function uploadPhotos(url, tit, num) {
                alert(RS.ip);
                var template =
                    '<p class="text-danger">请务必确保照片清晰度和真实性</p>' +
                    '      <form enctype="multipart/form-data" method="POST">' +
                    '           <div style="padding:0 20px;">' +
                    '                <input name="file2" class="voucher" type="file" id="voucherg" data-min-file-count="1" accept="image/*">' +
                    '           </div>' +
                    '      </form>';
                swal({
                    title: tit,
                    html: template,
                    preConfirm: function () {
                        return new Promise(function (resolve, reject) {
                            if ($('#voucherg')[0].value === '') {
                                reject('您还未选择文件！');
                                setTimeout(function () {
                                    removeLoading('test1');
                                }, 2000);
                            } else {
                                resolve()
                            }
                        })
                    },
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    width: '300px'
                }).then(function (file) {
                    $('body').loading({
                        title: '请稍等',
                        name: 'test1',
                        discription: '加载中'
                    });
                    var formData = new FormData();
                    formData.append("orderId", orderId);
                    formData.append("token", token);
                    $(".voucher").each(function () {
                        if (this.files.length > 0) {
                            for (var i = 0; i < this.files.length; i++) {
                                formData.append("file", this.files[i]);
                            }
                        }
                    });
                    $.ajax({
                        crossDomain: true,
                        type: "post",
                        url: RS.ip + url,
                        async: false,
                        contentType: false, //这个一定要写
                        processData: false, //这个也一定要写，不然会报错
                        data: formData,
                        dataType: 'text',
                        success: function (data) {
                            REST.pop(JSON.parse(data).message);
                            if (JSON.parse(data).code === '000000') {
                                vm.facadeIdCardInfo = JSON.parse(data).data;
                                vm.facadeIdCard = JSON.parse(data).data.custIdCardFront;
                                vm.facadeIdCardFlag = true;
                            }
                            setTimeout(function () {
                                removeLoading('test1');
                            }, 2000);
                        }
                    });
                }, function () {
                });
                $("input[type=file].voucher").fileinput({ //这里的id是input标签的id
                    allowedFileExtensions: ['jpg', 'png'], // 允许的文件类型
                    overwriteInitial: false,
                    showPreview: false, //是否显示预览,不写默认为true
                    showCaption: true, //是否显示标题
                    language: 'zh', //设置语言
                    maxFileSize: 5000, //文件的最大大小 5000KB=5兆
                    maxFilesNum: 20, //最多文件数量
                    autoReplace: false,
                    showUpload: false, //是否显示上传按钮
                    enctype: 'multipart/form-data',
                    slugCallback: function (filename) {
                        return filename.replace('(', '_').replace(']', '_');
                    }
                })
            }

            function uploadPhotosfan(url, tit, num) {
                if (vm.facadeIdCardFlag) {
                    var template =
                        '<p class="text-danger">请务必确保照片清晰度和真实性</p>' +
                        '      <form enctype="multipart/form-data" method="POST">' +
                        '           <div style="padding:0 20px;">' +
                        '                <input name="file1" class="voucherf" type="file" id="voucher" data-min-file-count="1">' +
                        '           </div>' +
                        '      </form>';
                    swal({
                        title: tit,
                        html: template,
                        preConfirm: function () {
                            return new Promise(function (resolve, reject) {
                                if ($('#voucher')[0].value === '') {
                                    reject('您还未选择文件！');
                                    setTimeout(function () {
                                        removeLoading('test1');
                                    }, 2000);
                                } else {
                                    resolve()
                                }
                            })
                        },
                        showCancelButton: true,
                        allowOutsideClick: false,
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        width: '300px'
                    }).then(function (file) {
                        // $('body').loading({
                        //     title: '请稍等',
                        //     name: 'test1',
                        //     discription: '加载中'
                        // });
                        var formData = new FormData();
                        formData.append("orderId", orderId);
                        formData.append("token", token);
                        $(".voucherf").each(function () {
                            if (this.files.length > 0) {
                                for (var i = 0; i < this.files.length; i++) {
                                    formData.append("file", this.files[i]);
                                }
                            }
                        });
                        $.ajax({
                            crossDomain: true,
                            type: "post",
                            url: RS.ip + url,
                            async: false,
                            contentType: false, //这个一定要写
                            processData: false, //这个也一定要写，不然会报错
                            data: formData,
                            dataType: 'text',
                            success: function (data) {
                                REST.pop(JSON.parse(data).message);
                                if (JSON.parse(data).code === '000000') {
                                    vm.custIdCardValtime = JSON.parse(data).data;
                                    vm.identityCard = JSON.parse(data).data.custIdCardBack;
                                    vm.identityCardFlag = true;
                                }
                                setTimeout(function () {
                                    removeLoading('test1');
                                }, 2000);
                            }
                        });
                    }, function () {
                    });
                    $("input[type=file].voucherf").fileinput({ //这里的id是input标签的id
                        allowedFileExtensions: ['jpg', 'png'], // 允许的文件类型
                        overwriteInitial: false,
                        showPreview: false, //是否显示预览,不写默认为true
                        showCaption: true, //是否显示标题
                        language: 'zh', //设置语言
                        maxFileSize: 5000, //文件的最大大小 5000KB=5兆
                        maxFilesNum: 20, //最多文件数量
                        autoReplace: false,
                        showUpload: false, //是否显示上传按钮
                        enctype: 'multipart/form-data',
                        slugCallback: function (filename) {
                            return filename.replace('(', '_').replace(']', '_');
                        }
                    })
                } else {
                    REST.pop('请务必先上传身份证正面')
                }

            }

            function nextStep() {
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