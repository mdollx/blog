'use strict';

angular.module('myApp.addPost', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addPost', {
    templateUrl: 'addPost/addPost.html',
    controller: 'AddPostCtrl'
  });
}])

.controller('AddPostCtrl', ['$scope','$firebase','$location','CommonProp',function($scope,$firebase,$location,CommonProp) {
     
  if(!CommonProp.getUser()){
    $location.path('/main');
}
     var login={};
$scope.login=login;

  $scope.logout = function(){
    CommonProp.logoutUser();
}

    $scope.AddPost = function(){
  login.loading = true;
  var title = $scope.article.title;
  var date = $scope.article.date;
        var post = $scope.article.post;
  
  var firebaseObj = new Firebase("myblog-ang-fb.firebaseio.com/Articles");
  
      var fb = $firebase(firebaseObj);
        
  var user = CommonProp.getUser();
  

  fb.$push({ title: title, date: date, post: post,emailId: user,'.priority': user}).then(function(ref) {
    login.loading = false;
    $location.path('/welcome');
  }, function(error) {
    login.loading = false;
      console.log("Error:", error);
  });

    }
}]);
