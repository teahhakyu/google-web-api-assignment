// var request = require('request')
// var https = require('http');

 app.controller('searchController', function($scope, $http){
//     //var mongo = require('./mongo.js')
//     // $scope.form = {}
//     // $scope.customers = [];
//     //var request = require('exportsearch.js');
//     $scope.search = function($event){
//       // var place = $scope.place;
//       // var country = $scope.place;
//       // var state = $scope.state;
//       // var activity = $scope.activity;
//       var key = 'AIzaSyAh-LwhZUj8x0vsIHBfYpKptPOgX78GrzA';
//       var location = "-33.8670522,151.1957362";
//       var radius = 16000;
//       var sensor = false;
//       var types = "restaurant";
//       var keyword = "fast";
//       var search = $scope.form.place;
//       console.log(search)
//       if($event.which == 13){
        
//         var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + "key=" + key + "&location=" + location + "&radius=" + radius + "&sensor=" + sensor + "&types=" + types + "&keyword=" + search;
        
        
//         // request({
//         //     url: url,
//         //     json: true
//         // }, function (error, response, body) {
        
//         //     if (!error && response.statusCode === 200) {
//         //         console.log(body) // Print the json response
//         //         $scope.result = "Reach"
//         //     }
//         // })
        
//         // var query_string = {q: place, maxResults: 40, fields:'items(place_id, price_level)'}
//         // request.get({url:url, qs:query_string},function(err,res,body){
//         //   const json = JSON.parse(body)
//         //   const items = json.items
//         //   const books = items.map(function(element){
//         //     return {place_id:books.place, price_level:books.country}
//         //   })
//         // })
      
//         // var url = 'https://www.googleapis.com/books/v1/volumes?maxResults=40&fields=items(id,volumeInfo(title))&q='+search
//       }
//       // mongo.addList(search, data=>{
//       //     console.log('returned:' +data)
//       // })
//       // const newList = newList({place: $scope.form.place})
//       // Customer.newList.save({}, $scope.form, 
//       //   function(data){
//       //       $scope.customers.push(data);
//       //   })
//       $http.get(url)(function(response) {
        
//         var body ='';
        
//           response.on('data', function(chunk) {
//             body += chunk;
//           });
//         // var places = JSON.parse(body);
//         // //var items = json.items;
//         // var locations = places.results;
//         // var randLoc = locations[Math.floor(Math.random() * locations.length)];
//         // $scope.books = response.json(randLoc);
//           response.on('end', function() {
//             var places = JSON.parse(body);
//             var locations = places.results;
//             var randLoc = locations[Math.floor(Math.random() * locations.length)];
//             $scope.result = locations
//             console.log(randLoc)
//             //$scope.books = response.randloc
//             // res.json(randLoc);
//           });
//         }).on('error', function(e) {
//           console.log("Got error: " + e.message);
        
//       // // $scope.books = response.items
        
        
        
        
//       // })
     
//       })
//     }
     $scope.addToDatabase = function() {
          $http
              .post('/customer', $scope.searchPlace)
              .success(function(data){
                  //what to do here
              })
              .error(function(data){
                  console.log('Error: ' + data);
              });
      };
          
})
// app.controller('searchController', function($scope, Api){
//     $scope.form = {}
//     $scope.customers = [];
    
//     Api.Customer.query({}, function(data){
//         $scope.customers = data;
//     });
    
//     $scope.addToDatabase = function(){
        
        
//         Api.Customer.save({}, $scope.form, 
//         function(data){
//             $scope.customers.push(data);
//         })
        
//     }
    
    
// })


