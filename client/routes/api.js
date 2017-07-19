/*global angular  */

/* we 'inject' the ngRoute module into our app. This makes the routing functionality to be available to our app. */
var app = angular.module('myApp', [
    'ngRoute',
    'ngResource']);
app.config(function($routeProvider){
        
        //new comment
        
        $routeProvider.when('/search',{
            controller:'searchController',
            templateUrl:'client/templates/search.html'
        });

       

        $routeProvider.otherwise({ redirectTo: '/search' });
        
    });