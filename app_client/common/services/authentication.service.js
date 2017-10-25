(function () {
    angular
        .module("app")
        .service("authentication", authentication);

    authentication.$inject = ['$http', '$window']
    function authentication($http, $window) {

        var saveToken = function (token) {
            $window.localStorage['app-token'] = token;
        }

        var getToken = function () {
            return $window.localStorage['app-token'];
        }

        var register = function (data) {
            return $http.post('/api/register', data)
                .then(function (response) {
                    console.log(response);
                    saveToken(response.data.token);
                    $window.location.href = '#!/home';
                })
        }

        var login = function (data) {
            return $http.post('/api/login', data)
                .then(function (response) {
                    console.log(response);
                    saveToken(response.data.token);
                    $window.location.href = '#!/home';
                });
        }

        var logout = function(){
            console.log("logout");
            $window.localStorage.removeItem("app-token");
        }

        var isLogedIn = function () {
            var token = getToken();
            if (token) {
                var tokenSections = token.split('.');
                var payload = JSON.parse($window.atob(tokenSections[1]));
                return payload.exp > Date.now() / 1000;
                return true;
            } 
            else return false;


        }

        var currentUser = function(){
            if(isLogedIn()){
                var token = getToken();
                var tokenSections = token.split('.');
                var payload = JSON.parse($window.atob(tokenSections[1]));
                return {
                    email : payload.email,
                    name : payload.name
                }
            }
        }

        return {
            saveToken: saveToken,
            getToken: getToken,
            register: register,
            login: login,
            logout : logout,
            isLogedIn : isLogedIn,
            currentUser : currentUser
        }
    }
})()