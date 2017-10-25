(function () {
    angular
        .module("app")
        .service("locationData", locationData)

    locationData.$inject = ['$http', 'authentication'];
    function locationData($http, authentication) {

        var getById = function (id) {
            return $http.get("/api/getById/" + id);
        }

        var getAll = function () {
            return $http.get("/api/getAll");
        }
        var addReview = function (data) {
            return $http.post("/api/addReview", data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        }
        return {
            getById: getById,
            getAll: getAll,
            addReview: addReview
        }
    }
})();