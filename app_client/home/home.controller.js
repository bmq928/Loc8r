(function () {
    angular.module("app")
        .controller('homeCtrl', homeCtrl)

    homeCtrl.$inject = ['$scope', 'locationData', 'authentication', '$route']
    function homeCtrl($scope, locationData, authentication, $route) {
        var vm = this;

        vm.locations = "loading......";

        locationData.getAll()
            .then(function(response){
                vm.locations = response.data;
            })
            
        
    }

})()