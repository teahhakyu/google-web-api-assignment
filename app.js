
    
var app = angular.module("app", ['ngRoute']);


app.config(['$routeProvider', function($routeProvider) {

  $routeProvider.
  when('/search', {
    templateUrl: '',
    controller: 'searchController',
  }).
    otherwise({
      redirectTo: '/search'
    });

}])

app.controller('searchController', function($scope, $http){
    $scope.search = function($event){
        console.log('search()')
    if ($event.which == 13) { // enter key presses
      var search = $scope.searchTerm
      console.log(search)
      var url = 'https://www.googleapis.com/books/v1/volumes?maxResults=40&fields=items(id,volumeInfo(title))&q='+search
      $http.get(url).success(function(response) {
        console.log(response)
        $scope.books = response.items
        $scope.searchTerm = ''
      })
    }
    }
})