(function () {
    // w5cValidator config
    app.config(['w5cValidatorProvider', function (w5cValidatorProvider) {
        w5cValidatorProvider.config({
            blurTrig: true,
            showError: true,
            removeError: true
        });
    }]);

    // lazyLoad config
    app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.constant = $provide.constant;
        }]);

    // router config
    app.config(function ($stateProvider, $urlRouterProvider, $controllerProvider, $ocLazyLoadProvider) {
        app.controllerProvider = $controllerProvider;

        // $urlRouterProvider.otherwise("app/entAccount");    // 商户系统进注册页面
        $urlRouterProvider.otherwise("/login");    // 商户系统进注册页面

        $ocLazyLoadProvider.config({
            debug: 0
        });

        $stateProvider

        // system
            .state('login', {
                url: "/login",
                templateUrl: "views/common/login.html",
                controller: 'loginCtrl',
                data: {pageTitle: '登录', specialClass: 'gray-bg'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/common/login.js')
                    }]
                }
            })
            // pages
            .state('app', {
                url: "/app",
                controller: 'mainCtrl2',
                templateUrl: "views/common/content.html",
            })

            // home
            .state('app.home', {
                url: "/home",
                templateUrl: "views/home/home.html",
                data: {pageTitle: '运营商认证'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/home/home.js')
                    }]
                }
            })

            // home
            .state('app.entAccount', {
                url: "/entAccount",
                templateUrl: "views/entAccount/entAccount.html",
                data: {pageTitle: '项目信息填写'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/entAccount/entAccountCtrl.js')
                    }]
                }
            })

            //
            .state('app.createAccount', {
                url: "/createAccount",
                templateUrl: "views/createAccount/createAccount.html",
                data: {pageTitle: '身份证信息认证'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/createAccount/createAccountCtrl.js')
                    }]
                }
            })

            //
            .state('app.perInforma', {
                url: "/perInforma",
                templateUrl: "views/perInforma/perInforma.html",
                data: {pageTitle: '个人基本信息'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/perInforma/perInformaCtrl.js')
                    }]
                }
            })

            //
            .state('app.medical', {
                url: "/medical",
                templateUrl: "views/medical/medical.html",
                data: {pageTitle: '附件上传'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/medical/medicalCtrl.js')
                    }]
                }
            })

            //
            .state('app.contract', {
                url: "/contract",
                templateUrl: "views/contract/contract.html",
                data: {pageTitle: '签署合同'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/contract/contractCtrl.js')
                    }]
                }
            })
            //
            .state('app.orderList', {
                url: "/orderList",
                templateUrl: "views/orderList/orderList.html",
                data: {pageTitle: '订单列表'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/orderList/orderListCtrl.js')
                    }]
                }
            })

            //
            .state('app.orderDetail', {
                url: "/orderDetail",
                templateUrl: "views/orderDetail/orderDetail.html",
                data: {pageTitle: '订单详情'},
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('views/orderDetail/orderDetailCtrl.js')
                    }]
                }
            })

    })
})();
