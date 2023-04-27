(function () {
    'use strict';

    angular
        .module('app')
        .controller('CareerController', CareerController);

    CareerController.$inject = ['UserService', '$rootScope','FlashService'];
    function CareerController(UserService, $rootScope,FlashService) {
        var vm = this;

        vm.obj = null;
        vm.careers = [];
        vm.submitNew = submitNew;
        vm.edit = edit;
        vm.reset = reset;
        vm.deleteObj = deleteObj;
        //vm.deleteCareer = deleteCareer;

        initController();

        function initController() {
            vm.userName = $rootScope.globals.currentUser.username;
            //loadCurrentUser();
            loadAllCareers();
        }
        
        function loadAllCareers() {
            UserService.GetAllCareer()
                .then(function (careers) {
                    vm.careers = careers;
                    //console.log(vm.careers);
                });
        }

        function submitNew() {
            vm.dataLoading = true;
            var isEditing = !vm.isEditing ? false : true;
           
                var data = {
                    id: vm.obj.id,
                    careername: vm.obj.careername,
                    careerdescription: vm.obj.careerdescription,
                    reason: vm.obj.reason,
                    targetdate: moment(vm.obj.targetdate).format('YYYY-MM-DD'),
                    completeddate: moment(vm.obj.completeddate).format('YYYY-MM-DD')
                };

            var request = !isEditing ? UserService.Create(data) : UserService.Edit(data);
            var successMsg = `Entry request has been successfully ${!isEditing ? 'submitted' : 'updated'}.`;
                
            request.then(function (response) { 
                loadAllCareers();
                console.log(response);
                FlashService.Success(successMsg);
            });
            
            reset();
            vm.dataLoading = false;
        }

        function edit(obj) {
            vm.isEditing = true;
                var data = {
                    id: obj.id,
                    careername: obj.careername,
                    careerdescription: obj.careerdescription,
                    reason: obj.reason,
                    targetdate: new Date(obj.targetdate),
                    completeddate: new Date(obj.completeddate)
                };
            vm.obj = data;
        }

        function reset() {
        vm.dataLoading = true;
            var data = {
                careername: null,
                careerdescription: null,
                reason: null,
                targetdate: null,
                completeddate: null
            };
            vm.obj = data;
            vm.isEditing = false;
        vm.dataLoading = false;
        }

        function deleteObj(id) {
            UserService.Delete(id)
            .then(function (result) {
                console.log(result.rowsAffected[0]);
                loadAllCareers();
            });
        }

        function loadCurrentUser() {
            console.log($rootScope.globals.currentUser.username);
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user[0];
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();