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
               $state.go('app.perInforma')
           }
        }])
})();