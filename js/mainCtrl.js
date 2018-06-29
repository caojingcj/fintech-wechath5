(function () {
  'use strict'
  app.controller('MainCtrl', ['$rootScope', '$scope', '$window', function ($rootScope, $scope, $window) {
    $rootScope.close = function () {
      swal.close()
    }
  }]);
  app.controller('mainCtrl2', ['$rootScope', '$scope', '$state', 'REST', function ($rootScope, $scope, $state, REST) {
    $scope.state = $state;
//  $scope.user = JSON.parse(sessionStorage.getItem('finTechInfo'));
    $scope.$on('$stateChangeSuccess', function () {
      $("#page-wrapper")[0].style.minHeight = $(window).innerHeight() + 'px';
      if ($scope.isSmart) {
        $('body').removeClass('mini-navbar');
      }
    });

    $scope.signOut = function () {
        $state.go('login')
    };

    // 后退检测
    // $scope.$on('$viewContentLoaded', function(){
    //   if(!$rootScope.rightList){
    //     $state.go('login');
    //   }
    // });
  }]);
})();

