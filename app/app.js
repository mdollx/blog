'use strict';
 
angular.module('myApp', [
    'ngRoute',
    'myApp.main',
    'myApp.login',
    'myApp.register',
    'myApp.welcome',
    'myApp.addPost'     // Newly added module
]).
config(['$routeProvider', function($routeProvider) {
    // Set defualt view of our app to home
 
    $routeProvider.otherwise({
        redirectTo: '/main'
    });
}]);