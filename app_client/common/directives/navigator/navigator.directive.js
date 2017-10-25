(function () {
    angular
        .module("app")
        .directive("navigator", navigator);

    function navigator() {
        return {
            restrict : "EA",
            templateUrl : '/common/directives/navigator/navigator.template.html',
            controller : "navCtrl as navvm"
            // scope:{
            //     isChange : "=isChange"
            // },
        }
    }
})();