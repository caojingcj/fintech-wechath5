/**
 *  Created by fangQing on 2018/06/17.
 */
(function () {
    'use strict';

    app
        .controller('medicalCtrl', ['REST', '$timeout', '$state', '$scope', 'RS','$stateParams',function (REST, $timeout, $state, $scope,RS,$stateParams) {
            var mobile = REST.sessionParam('mobile', $stateParams.mobile === "" ? null : $stateParams.mobile);
            var order = REST.sessionParam('order', $stateParams.order === "" ? null : $stateParams.order);
            var token = JSON.parse(sessionStorage.getItem('finTechInfo'));
            var vm = this;
            vm.handle = {
                goStep: goStep,
                upPic: upPic
            };

            vm.flag = false;
            function upPic() {
                console.log();
                var template =
                    '<p class="text-danger">只支持jpg、zip、png格式且单文件大小不能超过5.0M</p>' +
                    '      <form enctype="multipart/form-data" method="POST">' +
                    '           <div style="padding:0 20px;">' +
                    '                <input name="file1" class="voucher" type="file" id="voucher" data-min-file-count="1">' +
                    '           </div>' +
                    '      </form>';
                swal({
                    title: '上传医疗确认单',
                    html: template,
                    preConfirm: function () {
                        return new Promise(function (resolve, reject) {
                            if ($('#voucher')[0].value === '') {
                                reject('您还未选择文件！')
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
                    var formData = new FormData();
                    formData.append("orderId", order);
                    formData.append("token",token );
                    formData.append("atthType", 0);
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
                        url: RS.ip + "app/orderbaseinfo/saveOrderAttachment",
                        async: false,
                        contentType: false, //这个一定要写
                        processData: false, //这个也一定要写，不然会报错
                        data: formData,
                        dataType: 'text',
                        success: function (data) {
                            REST.pop(JSON.parse(data).message);
                            vm.saveOrderAttachment = JSON.parse(data).data;
                            vm.flag = true;
                        }
                    });
                }, function () {
                });

                $("input[type=file].voucher").fileinput({ //这里的id是input标签的id
                    allowedFileExtensions: ['jpeg', 'jpg', 'png', 'rar', 'zip', 'pdf'], // 允许的文件类型
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

            function goStep() {
                if(vm.flag === true){
                    $('body').loading({
                        title: '请稍等',
                        name: 'test',
                        discription: '数据加载中..'
                    });

                    setTimeout(function () {
                        $state.go('app.contract',{mobile:mobile,order:order});
                        removeLoading('test');
                    }, 1000);
                }else {
                    REST.pop('请上传附件');
                }

            }
        }])
})();