(function () {
    angular
        .module("app")
        .controller("addReviewCtrl", addReviewCtrl)

    //locData was inject by resolve method in detail controller
    //locationData is an custom angular service
    addReviewCtrl.$inject = ['$uibModalInstance', '$route' , 'locData', 'locationData', '$scope']
    function addReviewCtrl($uibModalInstance, $route, locData, locationData, $scope) {
        var vm = this;

        vm.form = {}; //make vm.form.author and other valid

        vm.onSubmit = function () {

            // console.log(vm.form.author);
            // console.log(vm.form.rating);                        
            // console.log(vm.form.review);
            console.log(typeof vm.form.rating);
            console.log(vm.form.rating);

            if (!vm.form.rating || !vm.form.review){
                vm.error = "all field is required";
            } else {
                var data = {
                    id: locData.id,
                    rating: parseInt(vm.form.rating),
                    reviewText: vm.form.review,
                    createOn: Date.now()
                }

                locationData
                    .addReview(data)
                    .then(function (response) {
                        $uibModalInstance.dismiss();
                        console.log(response);
                        // vm.newReview = data;
                    })
                    .catch(function (err) {
                        vm.error = "your review isnt saved ! Please try again !"
                        console.log(err);
                    })
                // $window.path('/detail/' + data.id).replace();
                // console.log($window.path());
                // $window.location.href = '#!/detail/' + data.id;
                

            }

            return false;
        }

        vm.onCancel = function(){
            $uibModalInstance.close();
        }
    }
})();