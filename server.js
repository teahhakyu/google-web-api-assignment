"use strict";

var config  = require('./config.js')
var restify       = require('restify')
var mongoose      = require('mongoose')
var configDB = require('./database.js');
var mongojs = require('mongojs');


//database initialization
var db = mongojs('mongodb://admin:admin123@ds053718.mongolab.com:53718/restifymyapp', ['products']);


//create a new server 
var server = restify.createServer({
    name    : config.name,
    version : config.version
})

//require restify parameter
server.use(restify.jsonBodyParser({ mapParams: true }))
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser({ mapParams: true }))
server.use(restify.fullResponse())
 
//RESTFUL 
server.get("/products", function (req, res, next) {
    db.products.find(function (err, products) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(products));
    });
    return next();
});

server.get('/product/:id', function (req, res, next) {
    db.products.findOne({
        _id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
    });
    return next();
});

server.post('/product', function (req, res, next) {
    var product = req.params;
    db.products.save(product,
        function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    return next();
});

server.put('/product/:id', function (req, res, next) {
    // get the existing product
    db.products.findOne({
        _id: req.params.id
    }, function (err, data) {
        // merge req.params/product with the server/product

        var updProd = {}; // updated products 
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
            updProd[n] = data[n];
        }
        for (var n in req.params) {
            updProd[n] = req.params[n];
        }
        db.products.update({
            _id: req.params.id
        }, updProd, {
            multi: false
        }, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    });
    return next();
});

server.del('/product/:id', function (req, res, next) {
    db.products.remove({
        _id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(true));
    });
    return next();
});
server.del('/product', function (req, res, next) {
    db.products.remove({
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(true));
    });
    return next();
});

//get index.html to run
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

//server port initialization
server.listen(8080, function () {
    console.log("Server started @ 8080");
});

module.exports = server;



