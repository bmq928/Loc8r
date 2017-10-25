(function () {
    angular
        .module("app")
        .controller("navCtrl", navCtrl);


    navCtrl.$inject = ['authentication', '$location', '$uibModal', '$route']
    function navCtrl(authentication, $location, $uibModal, $route) {
        var vm = this;
        vm.isLogedIn = authentication.isLogedIn();
        console.log("is log in" + vm.isLogedIn);
        if (vm.isLogedIn) {
            
            vm.user = authentication.currentUser();
            console.log("get user " + vm.user.name);
        }



        vm.logout = function () {
            authentication.logout();
            //update vm.isLoggedIn to make change in nav bar
            console.log("is logged in " + vm.isLogedIn);
            vm.isLogedIn = authentication.isLogedIn();
            // $route.reload();
            // $location.path("/#!/home");
        }

        vm.addLogin = function () {
            $uibModal.open({
                templateUrl: "/auth/login/login.view.html",
                controller: "loginCtrl as vm"
            }).closed
                .then(function () {
                    vm.isLogedIn = authentication.isLogedIn();
                    console.log("after login " + vm.isLogedIn);
                    // $route.reload();
                })
        }

        vm.addRegister = function () {
            $uibModal.open({
                templateUrl: "/auth/register/register.view.html",
                controller: "registerCtrl as vm"
            }).closed
            .then(function () {
                vm.isLogedIn = authentication.isLogedIn();
                console.log("after register " + vm.isLogedIn);
                // $route.reload();
            })
        }

    }
})()