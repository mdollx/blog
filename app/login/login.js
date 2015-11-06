'use strict';

angular.module('myApp.login', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope','$location','CommonProp','$firebaseAuth',function($scope,$location,CommonProp,$firebaseAuth) {
 var firebaseObj = new Firebase("myblog-ang-fb.firebaseio.com");
    var loginObj = $firebaseAuth(firebaseObj);
    
    loginObj.$onAuth(function(authData) {
    if(authData){
        CommonProp.setUser(authData.password.email);
        $location.path('/welcome');
    }
 });
  
  $scope.user = {};
  $scope.SignIn = function(e) {
    e.preventDefault();
    var username = $scope.user.email;
    var password = $scope.user.password;
    loginObj.$authWithPassword({
            email: username,
            password: password
        })
        .then(function(user) {
            //Success callback
            console.log('Authentication successful');
	CommonProp.setUser(user.password.email);
		$location.path('/welcome');
        }, function(error) {
            //Failure callback
            console.log('Authentication failure');
        });
}
}])
.service('CommonProp',['$location','$firebaseAuth',function($location,$firebaseAuth) {
    var user = '';
    var firebaseObj = new Firebase("myblog-ang-fb.firebaseio.com");
    var loginObj = $firebaseAuth(firebaseObj);
  
    return {
        getUser: function() {
            if(user == ''){
                user = localStorage.getItem('userEmail');
            }
            return user;
        },
        setUser: function(value) {
            localStorage.setItem("userEmail", value);
            user = value;    
        },
        logoutUser:function(){
            loginObj.$unauth();
            user='';
            localStorage.removeItem('userEmail');
            $location.path('/main');
        }
    };
}]);