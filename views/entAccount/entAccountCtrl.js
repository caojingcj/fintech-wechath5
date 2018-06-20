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

            vm.init ={
                companyType:[
                    {val:1,tit:'整容'},
                    {val:1,tit:'养身'},
                    {val:1,tit:'植发'}
                ]
            };

            console.log(vm.init.companyType);

            function goStep(data) {
                $('body').loading({
                    title:'请稍等',
                    name:'test',
                    discription:'数据加载中..',
                });

                setTimeout(function(){
                    removeLoading('test');
                    $state.go('app.createAccount');
                },1000);
            }
        }])
})();