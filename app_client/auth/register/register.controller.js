(function () {
    angular
        .module("app")
        .controller("registerCtrl", registerCtrl)

    registerCtrl.$inject = ['$uibModalInstance', 'authentication', '$window']
    function registerCtrl($uibModalInstance, authentication, $window) {
        var vm = this;

        vm.onSubmit = function () {
            if (!vm.email || !vm.password || !vm.name)
                vm.error = "all fields are required";
            else {
                var data = {
                    email: vm.email,
                    password: vm.password,
                    name: vm.name
                };

                authentication
                    .register(data)
                    .then(function () {
                        $uibModalInstance.dismiss();
                    })
                    .catch(function (err) {
                        vm.error = "ERROR";
                        console.log(err);
                    })

                // $route.reload();
            }
            return false;
        }

        vm.onCancel = function () {
            $uibModalInstance.close();
        }
    }
})()