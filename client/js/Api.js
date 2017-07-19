app.factory('Api', ['$resource', function($resource){
    return{
        Customer: $resource('/api/customer/:id', {id: '@id'})
    }
}]);