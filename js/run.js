(function () {
  app.run(function ($rootScope, $state, $window) {
    // test device type
    // checks for IOS, Android, Blackberry, Opera Mini, and Windows mobile devices
    function isSmartDevice ($window) {
      var ua = $window["navigator"]["userAgent"] || $window["navigator"]["vendor"] || $window["opera"];
      return /iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/.test(ua);
    }

    $rootScope.isSmart = isSmartDevice($window);
    $rootScope.location = location;

    // test token
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeSuccess', function () {
      $(window).scrollTop(0);
      // $('body').scrollTop(0);
      // $('html').scrollTop(0);
    });

    // set default skin
    var defaultSkin = localStorage.getItem('skin');
    if (defaultSkin) {
      $rootScope.skin = defaultSkin
    }

    // Indicate how to align the cell data at bootstrapTable
    // initBootstrapTable();
    //
    // function initBootstrapTable () {
    //   var bootstrapTableColumnDefaults = $.fn.bootstrapTable.columnDefaults;
    //   bootstrapTableColumnDefaults.align = 'center';
    //   bootstrapTableColumnDefaults.valign = 'middle';
    // }

    // function log (...log) {
    //   if (location.hostname !== 'manage.16fenqi.com') {
    //     return false
    //   }
    //   console.log(...log)
    // }

    Array.prototype.average = function (v) {
      var i = 0, c = 0
      for (; i < this.length; i++) {
        c += this[i]
      }
      return Number((c / i).toFixed(v))
    }
    // console.log(window.laySetting.prototype.lang().tools.now)
  });
})();