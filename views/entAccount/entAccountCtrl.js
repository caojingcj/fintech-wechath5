/**
 *  Created by fangQing on 2018/06/14.
 */
(function () {
    'use strict';

    app
        .controller('entAccountCtrl', ['REST', '$timeout', '$state', '$scope', '$compile',function (REST, $timeout, $state, $scope,$compile) {
            var vm = this;

            vm.handle = {
                goStep:goStep
            };

            function goStep(data) {
                $('body').loading({
                    loadingWidth:180,
                    title:'请稍等!',
                    name:'test',
                    discription:'描述描述描述描述',
                    smallLoading:false,
                    loadingMaskBg:'rgba(0,0,0,0.2)'
                });

                setTimeout(function(){
                    removeLoading('test');
                },1000);
                console.log(data);
                // REST.pop('success', null, '出错了');
                $state.go('app.createAccount');
            }
        }])
})();