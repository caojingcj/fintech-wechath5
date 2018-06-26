/**
 *  Created by fangQing on 2018/06/13.
 */
(function () {
    'use strict';

    app
        .controller('homeCtrl', ['REST', '$timeout', '$state', '$scope','$stateParams', '$window',function (REST, $timeout, $state, $scope,$stateParams,$window) {
           var  vm =this;
            var mobile = REST.sessionParam('mobile', $stateParams.mobile === "" ? null : $stateParams.mobile);
            var order = REST.sessionParam('order', $stateParams.order === "" ? null : $stateParams.order);
            var windowHeight = $window.innerHeight; //获取窗口高度
            $scope.objHeight={
                "height":windowHeight - 120
            };
            vm.handle = {
               nextStep:nextStep
           };
            toMoxieCarrierH5();

            function toMoxieCarrierH5() {
                REST.get('app/moxie/toMoxieCarrierH5?mobile=' + mobile + '&idCard=' + '340827199209153730' + '&name=' + '方青' + '&orderId=' + order).then(function (res) {
                    console.log(res);
                    $("#object").attr('data',res.data)
                })
            }

           function nextStep() {
               $('body').loading({
                   title:'请稍等',
                   name:'test',
                   discription:'数据加载中..',
               });

               setTimeout(function(){
                   $state.go('app.perInforma',{mobile:mobile,order:order});
                   removeLoading('test');
               },1000);
           }
        }])
})();