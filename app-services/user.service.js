(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var apiUri = "http://localhost:3000", //please configure if different
        service = {};

        service.GetAll = GetAll;
        service.GetByUsername = GetByUsername;
        service.GetAllCareer = GetAllCareer;
        service.Create = Create;
        service.Edit = Edit;
        service.Delete = Delete;
        
        return service;

        function GetAll() {
            return $http.get(apiUri + '/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetByUsername(username) {
            return $http.get(apiUri + '/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }
        
        function GetAllCareer() {
            return $http.get(apiUri + '/getCareers').then(handleSuccess, handleError('Error getting all objectives'));
        } 

        function Create(data) {
            return $http.post(apiUri + '/objpost', data).then(handleSuccess, handleError('Error creating new objective'));
        }

        function Edit(data) {
            return $http.put(apiUri + '/objput', data).then(handleSuccess, handleError('Error creating new objective'));
        }

        function Delete(id) {
            return $http.delete(apiUri + '/objdelete/' + id).then(handleSuccess, handleError('Error deleting user'));
        }
        /*function GetById(id) {
            return $http.get('/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }
        
        function Create(user) {
            return $http.post('/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }  */

        // private functions
        function handleSuccess(res) {
            //res.headers("X-TotalPages");
            return res.data;
        }

        function handleError(error) {
            return function () {
                return {error};
            };
        }
    }

})();
