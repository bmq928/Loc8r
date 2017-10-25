(function(){
    angular
        .module("app")
        .directive("pageFooter", pageFooter)

    function pageFooter(){
        return {
            restrict : "AE",
            templateUrl: '/common/directives/pageFooter/pageFooter.template.html',
            link : function(scope, element, attrs){
                console.log("Case test running from footer");
            }
        }
    }
})()