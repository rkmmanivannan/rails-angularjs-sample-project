var app = angular.module('customers');
app.controller("ConfirmDeactivateController", [
  "$scope","$modalInstance",
  function($scope , $modalInstance) {
    $scope.deactivate = function () {
      $modalInstance.close();
    };

    $scope.nevermind = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);
