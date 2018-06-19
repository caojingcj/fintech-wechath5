/**
 *  Created by fangQing on 2018/06/14.
 */
(function () {
    'use strict';

    app
        .controller('createAccountCtrl', ['REST', '$timeout', '$state', '$scope', '$compile',function (REST, $timeout, $state, $scope,$compile) {
            var vm = this;

            vm.handle = {
                nextStep:nextStep
            };

            vm.init = {
                protectProblem:[
                    {val:1,tit:'我的名字是？'},
                    {val:1,tit:'我的年龄？'},
                    {val:1,tit:'我的配偶的名字？'},
                    {val:1,tit:'我的第一家公司的名字？'}
                ]
            };

            function nextStep() {
                $state.go('app.home');
            }
        }])
})();