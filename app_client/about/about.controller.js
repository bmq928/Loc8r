(function () {
    angular
        .module("app")
        .controller("aboutCtrl", aboutCtrl)

    aboutCtrl.$inject = ['authentication', '$route']
    function aboutCtrl(authentication, $route) {
        var vm = this;
        // vm.isLogedIn = authentication.isLogedIn();
        // vm.user = authentication.currentUser();
        // // vm.logout = function () {
        // //     authentication.logout();
        // //     // $route.reload();
        // // };
        vm.about = "This is the website that I developed following a book named MEAN STACK. \n If there is any problems, please contact me at : 123456789 . \n Thank you!!!!!!!!!";
    }
})();