/**
 *  Created by fangQing on 2018/06/17.
 */
(function () {
    'use strict';

    app
        .controller('perInformaCtrl', ['REST', '$timeout', '$state', '$scope', function (REST, $timeout, $state, $scope) {
            var  vm =this;
            vm.handle = {
                goStep:goStep
            };

            function goStep() {
                $state.go('app.medical');
            }
        }])
})();