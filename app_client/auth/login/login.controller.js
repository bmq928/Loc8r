(function () {
    angular
        .module("app")
        .controller("loginCtrl", loginCtrl);

    loginCtrl.$inject = ['$uibModalInstance', 'authentication', '$route']
    function loginCtrl($uibModalInstance, authentication, $route) {
        var vm = this;

        vm.onSubmit = function () {
            if (!vm.email || !vm.password)
                vm.error = "all field is required";
            else {
                var data = {
                    email: vm.email,
                    password: vm.password
                };

                authentication
                    .login(data)
                    .then(function(){
                        $uibModalInstance.dismiss();
                    })
                    .catch(function (err) {
                        isErr = true;
                        vm.error = err.data.message;
                        console.log("catch" + err);
                    })

            }

            return false;
        }

        vm.onCancel = function () {
            $uibModalInstance.close();
        }
    }
})()