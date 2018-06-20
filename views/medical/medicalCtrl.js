/**
 *  Created by fangQing on 2018/06/17.
 */
(function () {
    'use strict';

    app
        .controller('medicalCtrl', ['REST', '$timeout', '$state', '$scope', function (REST, $timeout, $state, $scope) {
            var  vm =this;
            vm.handle = {
                goStep:goStep
            };

            function goStep() {
                $('body').loading({
                    title:'请稍等',
                    name:'test',
                    discription:'数据加载中..',
                });

                setTimeout(function(){
                    $state.go('app.contract');
                    removeLoading('test');
                },1000);
            }
        }])
})();