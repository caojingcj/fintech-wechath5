(function () {
    app.service('REST', ['$rootScope', '$http', '$q', '$state', 'toaster', 'RS', '$timeout', function ($rootScope, $http, $q, $state, toaster, RS, $timeout) {

        var token = '';
        var userInfo = JSON.parse(sessionStorage.getItem('finTechInfo'));
        $rootScope.timeoutToast = true;

        if (userInfo !== null) {
            token = userInfo;
        } else {
            // logout();
        }

        function sessionParam (key, val) {
            if (val) {
                sessionStorage.setItem(key, val);
                return val;
            } else {
                return sessionStorage.getItem(key);
            }
        }

        function pop(title, text, time) {
            $timeout(function () {
                toaster.pop('success', title, text, time || 1500)
            })
        }

        function logout() {
            token = '';
            userInfo = {};
            $state.go('login');
            $rootScope.finTechInfo = null;
            sessionStorage.clear();
        }

        function login(url) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(RS.ip + url ).then(function (res) {
                if (res.data.code === '000000') {
                    token = res.data.data;
                    sessionStorage.setItem('finTechInfo', JSON.stringify(res.data.data));
                    deferred.resolve(res.data);
                } else {
                    deferred.reject(res.data.message);
                    pop('error', null, res.data.message, 3000);
                    console.error(RS.ip + url + '&callback=JSON_CALLBACK', res.data.data);
                }
            }, function (err) {
                deferred.reject(err.data.message);
                pop('error', null, err.data.message, 3000);
            });
            return promise
        }

        function get (url, params, _noPop) {
            console.log(token);
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(RS.ip + url + '&token=' + token, {
                timeout: 1000 * 30,
                params: params
            }).then(function (res) {
                if (res.data.code === '000000') {
                    deferred.resolve(res.data);
                    // console.log(RS.ip + url + token, res.data);
                }
                else {
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
                console.error(RS.ip + url + token, err);
            });
            return promise
        }

        function post (url, data) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            data.token = token;
            $http.post(RS.ip + url , data).then(function (res) {
                if (res.data.code === '000000') {
                    deferred.resolve(res.data);
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
            post: post,
            sessionParam:sessionParam
        }
    }])
})();