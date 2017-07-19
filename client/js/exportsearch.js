var request = require('request')

exports.search = function(query,callback){
    console.log('search')
    if(typeof query !== 'string'|| query.length===0){
        console.log('No word for query')
        callback({code:400, response:{status:'error', message:'No query'}})
    }
    const url = 'https://www.googleapis.com/books/v1/volumes'
    const query_string = {q:query, maxResults:40,fields:'items(id,volumeInfo(title,authors))'}
    request.get({url:url,qs:query_string}, function(err, res,body){
        if(err){
            console.log('Google search failed')
            return callback({code:500,response:{status:'error',message:'Search failed', data:err}})
        }
    const json = JSON.parse(body)
    const items = json.items
    if(items){
        const books = items.map(function(element){
            return {id:element.id, volumeInfo:{title:element.volumeInfo.title,authors:element.volumeInfo.authors}}
        })
        console.log(books.length+'books found')
        return callback({cose:200, response:{status:'success',message:books.length+'books found',data:books}})
    }
    else
        return callback({code:200, response:{status:'success', message:'No book found', data:''}})
    })
}

exports.randeats = function(req, res){
  var key = req.query.key;
  var location = encodeURIComponent(req.query.location);
  var radius = 16000;
  var sensor = false;
  var types = "restaurant";
  var keyword = "fast";

  var https = require('https');
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + "key=" + key + "&location=" + location + "&radius=" + radius + "&sensor=" + sensor + "&types=" + types + "&keyword=" + keyword;
    console.log(url);
  https.get(url, function(response) {
    var body ='';
    response.on('data', function(chunk) {
      body += chunk;
    });

    response.on('end', function() {
      var places = JSON.parse(body);
      var locations = places.results;
      var randLoc = locations[Math.floor(Math.random() * locations.length)];

      res.json(randLoc);
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};