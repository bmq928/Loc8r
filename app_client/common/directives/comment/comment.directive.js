(function (){
    angular
        .module("app")
        .directive("comment", comment);

    function comment(){
        return {
            restrict : "AE",
            templateUrl : "/common/directives/comment/comment.template.html"
        }
    }
})();