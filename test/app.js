var app = angular.module('app', ['hngDateTimePicker']);

app.controller('tstCtrl', function ($scope) {
//    $scope.assignedon = new Date();
//    $scope.assignedon = new Date(1405233902100);
    $scope.assignedon = "2014-01-15T04:47:23.005Z";
//    $scope.assignedon = "2013-12-11 11:51 PM";
//    $scope.assignedon = undefined;

//    $scope.startDate = new Date("2013-12-10");
//    $scope.endDate = new Date("2013-12-20");

    $scope.chgRange = function () {
        $scope.assignedon = new Date();
        $scope.startDate = new Date("2013-12-05");
        $scope.endDate = new Date("2013-12-25");
    };
});
