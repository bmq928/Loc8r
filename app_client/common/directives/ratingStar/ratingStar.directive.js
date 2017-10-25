(function () {
    angular
        .module("app")
        .directive("ratingStar", ratingStar)

    function ratingStar() {
        return {
            restrict: "AE",
            scope: {
                numStar: "=numStar"
            },
            templateUrl: "/common/directives/ratingStar/ratingStar.template.html"
            // link: function (scope, element, attrs) {
            //     console.log("rate star " + scope.numStar);
            // }
        }
    }
})();