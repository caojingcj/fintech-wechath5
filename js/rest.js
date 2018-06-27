(function () {
    app.service('REST', ['$rootScope', '$http', '$q', '$state', 'toaster', 'RS', '$timeout', function ($rootScope, $http, $q, $state, toaster, RS, $timeout) {

        var token = '';
        var userInfo = JSON.parse(sessionStorage.getItem('finTechInfo'));
        $rootScope.timeoutToast = true;
        console.log(userInfo);
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
                toaster.pop('success', title, text, time || 2000)
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
            $('body').loading({
                title: '请稍等',
                name: 'test1',
                discription: '加载中'
            });
            $http.get(RS.ip + url ).then(function (res) {
                if (res.data.code === '000000') {
                    setTimeout(function () {
                        removeLoading('test1');
                    }, 2000);
                    token = res.data.data;
                    sessionStorage.setItem('finTechInfo', JSON.stringify(res.data.data));
                    deferred.resolve(res.data);
                } else {
                    setTimeout(function () {
                        removeLoading('test1');
                    }, 2000);
                    deferred.reject(res.data.message);
                    pop(res.data.message);
                    // console.error(RS.ip + url + '&callback=JSON_CALLBACK', res.data.data);
                }
            }, function (err) {
                console.log(err);
                // deferred.reject(err.data.message);
                // pop(err.data.message);
            });
            return promise
        }

        function get (url, params) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $('body').loading({
                title: '请稍等',
                name: 'test1',
                discription: '加载中'
            });
            $http.get(RS.ip + url + '&token=' + token, {
                timeout: 1000 * 30,
                params: params
            }).then(function (res) {
                if (res.data.code === '000000') {
                    deferred.resolve(res.data);
                    setTimeout(function () {
                        removeLoading('test1');
                    }, 2000);
                }
                else {
                    setTimeout(function () {
                        removeLoading('test1');
                    }, 2000);
                    deferred.reject(res.data.message);
                    pop(res.data.message);
                }
            }, function (err) {
                setTimeout(function () {
                    removeLoading('test1');
                }, 2000);
                deferred.reject(err);
                if (err.status === -1) {
                    pop('error', null, '未找到服务器！', 3000);
                } else if (err.status === 404) {
                    pop('网络异常，请检查您的网络连接并重试！');
                }
                console.error(RS.ip + url + token, err);
            });
            return promise
        }

        function post (url, data) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            data.token = token;
            $('body').loading({
                title: '请稍等',
                name: 'test1',
                discription: '加载中'
            });
            $http.post(RS.ip + url , data).then(function (res) {
                if (res.data.code === '000000') {
                    setTimeout(function () {
                        removeLoading('test1');
                    }, 2000);
                    deferred.resolve(res.data);
                    // console.log(RS.ip + url + '&token=' + token, res.data)
                } else {
                    setTimeout(function () {
                        removeLoading('test1');
                    }, 2000);
                    deferred.reject(res.data.message);
                    pop( res.data.message);
                    // console.error(RS.ip + url + '&token=' + token, res.data)
                }
            }, function (err) {
                setTimeout(function () {
                    removeLoading('test1');
                }, 2000);
                deferred.reject(err);
                console.log(err);
                pop('通讯错误');
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