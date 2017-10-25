(function () {
    angular
        .module("app")
        .controller("detailCtrl", detailCtrl);

    detailCtrl.$inject = ['$routeParams', '$scope', 'locationData', '$uibModal', 'authentication', '$route']
    function detailCtrl($routeParams, $scope, locationData, $uibModal, authentication, $route) {
        var vm = this;

        // //authenticate config
        // vm.isLogedIn = authentication.isLogedIn();
        // vm.user = authentication.currentUser();
        // // vm.logout = function () {
        // //     authentication.logout();
        // // };

        vm.locDetail = "loading.....";
        // vm.reviews = null;
        vm.isLogedIn = authentication.isLogedIn();

        var load = function () {
            locationData
                .getById($routeParams.id)
                .then(function (response) {
                    // console.log($routeParams.id);
                    vm.locDetail = response.data;
                    // vm.reviews = vm.locDetail.reviews;
                    console.log(vm.locDetail);
                })
                .catch(function (err) {
                    vm.locDetail = err;
                })
        }
        load();

        vm.addReview = function () {
            $uibModal.open({
                templateUrl: "/addReview/addReview.view.html",
                controller: "addReviewCtrl as vm",
                // controllerAs: "reviewVm",
                bindToController: true,
                resolve: {
                    locData: function () {
                        return {
                            id: vm.locDetail._id
                        }
                    }
                }
            }).closed
                .then(function () {
                    // vm.reviews.push(vm.newReview);
                    // vm.reviews =
                    //     console.log("new review " + vm.newReview);
                    load();
                    console.log(vm);
                })
            // .result.then(function(response){
            //     console.log(response.data);
            //     vm.locDetail.reviews = response.data.reviews;
            // })
        }
    }
})();