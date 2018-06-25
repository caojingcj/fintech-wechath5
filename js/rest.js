(function () {
    app.service('REST', ['$rootScope', '$http', '$q', '$state', 'toaster', 'RS', '$timeout', function ($rootScope, $http, $q, $state, toaster, RS, $timeout) {

        var sessionId = '';
        var userInfo = JSON.parse(sessionStorage.getItem('qrmngr_user_info'));
        var pendingUrls = [];

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            pendingUrls = [];
        });
        $rootScope.timeoutToast = true;

        function pop(type, title, text, time, _noPop) {
            if (_noPop) {
                return
            }
            $timeout(function () {
                toaster.pop(type, title, text, time || 1500)
            })
        }

        function logout() {
            sessionId = '';
            userInfo = {};
            $state.go('login');
            $rootScope.qrmngr_user_info = null;
            $rootScope.rightList = null;
            $rootScope.user = null;
            sessionStorage.clear();
        }

        function login(url) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.jsonp(RS.ip + url + '&callback=JSON_CALLBACK').then(function (res) {
                if (res.data.code === '000000') {
                    $rootScope.timeoutToast = true;
                    $state.go('app.entAccount');
                    sessionId = res.data.data.sessionId;
                    $rootScope.user = res.data.data;
                    sessionStorage.setItem('qrmngr_user_info', JSON.stringify(res.data.data));
                    deferred.resolve(res.data.data);
                    // console.log(RS.ip + url + '&callback=JSON_CALLBACK', res.data);
                } else {
                    deferred.reject(res.data.message);
                    pop('error', null, res.data.message, 3000);
                    // console.error(RS.ip + url + '&callback=JSON_CALLBACK', res.data);
                }
            }, function (err) {
                pop('error', null, RS.ip + url + '&callback=JSON_CALLBACK', 30000);
            });

            return promise
        }

        function get (url, params, _noPop) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var s = sessionId;
            $http.jsonp(RS.ip + url + '&callback=JSON_CALLBACK&sessionId=' + sessionId, {
                timeout: 1000 * 30,
                params: params
            }).then(function (res) {
                if (res.data.code === '000000') {
                    deferred.resolve(res.data);
                    console.log(RS.ip + url + '&callback=JSON_CALLBACK&sessionId=' + sessionId, res.data);
                } else if (res.data.code === '000100') {
                    deferred.reject(res.data.message);
                    // console.error(RS.ip + url + '&callback=JSON_CALLBACK', res.data);
                } else {
                    deferred.reject(res.data.message);
                    pop('error', null, res.data.message, 3000, _noPop);
                }
            }, function (err) {
                deferred.reject(err);
                if (err.status === -1) {
                    pop('error', null, '未找到服务器！', 3000);
                } else if (err.status === 404) {
                    pop('error', null, '网络异常，请检查您的网络连接并重试！', 3000);
                }
                console.error(RS.ip + url + '&callback=JSON_CALLBACK&sessionId=' + sessionId, err);
            });

            return promise
        }

        function post (url, data) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(RS.ip + url + '&sessionId=' + sessionId, data).then(function (res) {
                if (res.data.code === '000000') {
                    deferred.resolve(res.data.data);
                    // console.log(RS.ip + url + '&sessionId=' + sessionId, res.data)
                } else {
                    deferred.reject(res.data.message);
                    pop('error', null, res.data.message, 3000);
                    // console.error(RS.ip + url + '&sessionId=' + sessionId, res.data)
                }
            }, function (err) {
                deferred.reject(err);
                pop('error', null, '通讯错误', 3000);
                // console.error(err);
            });

            return promise
        }

        return {
            pop: pop,
            logout: logout,
            login: login,
            get: get,
            post: post
        }
    }])
})();