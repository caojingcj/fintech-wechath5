(function () {
  'use strict';

  app
    .filter('fileName', [function () {
      return function (val) {
        if (!val) {
          return ''
        }
        var arr = val.split('/');
        return arr[arr.length - 1]
      }
    }])
})();