(function () {

    angular
        .module('app')
        .directive('pageHeader', pageHeader);

    function pageHeader() {
        return {
            restrict: 'AE',
            scope: {
                titles:"@titles",
                straplines : "@straplines"
            },
            templateUrl: '/common/directives/pageHeader/pageHeader.template.html',
            // template: "nah",
            link: function (scope, element, attrs) {

                console.log(scope.titles);
                console.log(scope.straplines);

            }
        };
    }

})();