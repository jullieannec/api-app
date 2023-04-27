(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['UserService','$location', 'AuthenticationService', 'FlashService'];
    function LoginController(UserService, $location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;

            UserService.GetByUsername(vm.username)
            .then(function (user) {
                vm.user = user[0]; //console.log(vm.user);
                if (vm.user.password == vm.password) {
                    console.log(true);
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    var message = "Username or password is incorrect"
                    FlashService.Error(message);
                    vm.dataLoading = false;
                }
            });
           
        };
    }

})();
