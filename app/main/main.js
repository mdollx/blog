'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/main', {
        templateUrl: 'main/main.html',
        controller: 'MainCtrl'
    });
}])

.controller('MainCtrl', ['$scope', '$firebase','$location', 'CommonProp', function($scope, $firebase, $location ,CommonProp) {
    $scope.username = CommonProp.getUser();

   // $scope.username = CommonProp.getUser();
 
    var firebaseObj = new Firebase("myblog-ang-fb.firebaseio.com/Articles");


    var sync = $firebase(firebaseObj);

    $scope.articles = sync.$asArray();
    console.log(sync);

    
    $scope.logout = function(){
    CommonProp.logoutUser();
}

    $scope.editPost = function(id) {
        console.log(id);
        var firebaseObj = new Firebase("myblog-ang-fb.firebaseio.com/Articles/" + id);


        var syn = $firebase(firebaseObj);
        $scope.postToUpdate = syn.$asObject();

        $('#editModal').modal();
    }

    $scope.update = function() {
        console.log($scope.postToUpdate.$id);
        var fb = new Firebase("myblog-ang-fb.firebaseio.com/Articles/" + $scope.postToUpdate.$id);
        var article = $firebase(fb);
        article.$update({
            title: $scope.postToUpdate.title,
            post: $scope.postToUpdate.post,
            emailId: $scope.postToUpdate.emailId
        }).then(function(ref) {
            console.log(ref.key()); // bar
            $('#editModal').modal('hide')
        }, function(error) {
            console.log("Error:", error);
        });

    }


    $scope.confirmDelete = function(id) {
        var fb = new Firebase("myblog-ang-fb.firebaseio.com/Articles/" + id);
        var article = $firebase(fb);
        $scope.postToDelete = article.$asObject();
        $('#deleteModal').modal();
    }

    $scope.deletePost = function() {
        var fb = new Firebase("myblog-ang-fb.firebaseio.com/Articles/" + $scope.postToDelete.$id);
        var article = $firebase(fb);
        article.$remove().then(function(ref) {
            $('#deleteModal').modal('hide');
        }, function(error) {
            console.log("Error:", error);
        });
    }




}]);