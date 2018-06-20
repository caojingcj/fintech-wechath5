/**
 *  Created by fangQing on 2018/06/17.
 */
(function () {
    'use strict';

    app
        .controller('contractCtrl', ['REST', '$timeout', '$state', '$scope', '$window',function (REST, $timeout, $state, $scope,$window) {
            var  vm =this;
            var windowHeight = $window.innerHeight; //获取窗口高度
            $scope.objHeight={
                "height":windowHeight - 170
            };
            vm.handle = {
                nextStep:nextStep
            };

            function nextStep() {
                $('body').loading({
                    title:'请稍等',
                    name:'test',
                    discription:'数据加载中..',
                });

                setTimeout(function(){
                    $state.go('app.orderList')
                    removeLoading('test');
                },1000);
            }
        }])
})();