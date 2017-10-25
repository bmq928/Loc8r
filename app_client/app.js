// window.i = 0;
(function () {
    angular.module("app", ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: '/home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/detail/:id', {
                templateUrl : '/detail/detail.view.html',
                controller : 'detailCtrl',
                controllerAs: 'vm'
            })
            .when('/about', {
                templateUrl : '/about/about.view.html',
                controller : 'aboutCtrl',
                controllerAs : 'vm'
            })
            .when('/login', {
                templateUrl : '/auth/login/login.view.html',
                controller : 'loginCtrl',
                controllerAs : 'vm'
            })
            .when('/register', {
                templateUrl : '/auth/register/register.view.html',
                controller : "registerCtrl",
                controllerAs : "vm"
            })
            .otherwise({redirectTo : '/home'})
    }

    angular
        .module("app")
        .config(['$routeProvider', '$locationProvider', config]);
})();
