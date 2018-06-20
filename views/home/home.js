/**
 *  Created by fangQing on 2018/06/13.
 */
(function () {
    'use strict';

    app
        .controller('homeCtrl', ['REST', '$timeout', '$state', '$scope', function (REST, $timeout, $state, $scope) {
           var  vm =this;
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
                   $state.go('app.perInforma')
                   removeLoading('test');
               },1000);
           }
        }])
})();