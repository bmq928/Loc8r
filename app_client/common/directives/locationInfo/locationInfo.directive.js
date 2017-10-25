window.i = 1;

(function () {
    angular
        .module("app")
        .directive("locationInfo", locationInfo)

    function locationInfo() {
        return {
            restrict: "EA",
            scope: {
                loc: "=loc"
            },
            templateUrl: '/common/directives/locationInfo/locationInfo.template.html'
            // link: function (scope, element, attrs) {
            //     console.log(scope.loc);
            // }
        }
    }
})()