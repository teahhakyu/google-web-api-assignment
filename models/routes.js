var Customer = require('mongodb')
module.exports = function(router) {
    router.post('/customer', function(req, res){
        console.log(req.body);
        var customer = new Customer();
        customer.place = req.body.place;
        customer.country = req.body.country;
        customer.state = req.body.state;
        customer.activity = req.body.activity;
        //customer.place = "test";
        
        customer.save(function(err, data){
            if(err)
                throw err;
            res.json(data);
        });
        
        
    });
    
    router.get('/customer', function(req, res){
        Customer.find({},function(err, data){
            res.json(data);
        });
    });
    
    router.del('/customer', function(req, res){
        Customer.remove({}, function(err){
            res.json({result: err ? 'error': 'ok'});
        });
    });
    
    router.get('/customer/:id', function(req, res){
        Customer.findOne({_id: req.param.id},function(err, data){
            res.json(data);
        });
    });
    
    router.del('/customer/:id', function(req, res){
        Customer.remove({_id: req.param.id}, function(err){
            res.json({result: err ? 'error': 'ok'});
        });
    });
    router.put('/customer/:id', function (req, res) {
    // get the existing product
    Customer.findOne({
        id: req.params.id
    }, function (err, data) {
        var updProd = {}; 
        
        for (var n in data) {
            updProd[n] = data[n];
        }
        for (var n in req.params) {
            updProd[n] = req.params[n];
        }
        Customer.update({
            id: req.params.id
        }, updProd, {
            multi: false
        }, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    });
    
});
}

// var restify = require('restify');
// var server = require('./server');
 
// var client = restify.createJsonClient({
//     url: 'http://localhost:3000'
// });
 
// // a static product to CREATE READ UPDATE DELETE
 
// var testProduct = {
//     id: "1",
//     name: "Apple iPad AIR",
//     os: "iOS 7, upgradable to iOS 7.1",
//     chipset: "Apple A7",
//     cpu: "Dual-core 1.3 GHz Cyclone (ARM v8-based)",
//     gpu: "PowerVR G6430 (quad-core graphics)",
//     sensors: "Accelerometer, gyro, compass",
//     colors: "Space Gray, Silver"
// };
// console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
// client.get('/customer', function (err, req, res, products) {
//     if (err) console.log("Oops : ", err);
//     else console.log('Total products : ', products.length);
//     console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
 
//     client.post('/customer', testProduct, function (err, req, res, prod) {
//         if (err) console.log("Oops : ", err);
//         else console.log('Inserted product : ', prod);
//         console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
 
//         client.get('/customer/' + testProduct.id, function (err, req, res, prod) {
//             if (err) console.log("Oops : ", err);
//             else console.log('Product with ID :' + testProduct.id + ' :: ', prod);
//             console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
 
//             client.put('/customer/' + testProduct.id, {
//                 price: "999 USD"
//             }, function (err, req, res, status) {
//                 if (err) console.log("Oops : ", err);
//                 else console.log('Product Updated status :', status);
//                 console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
 
//                 client.get('/customer/' + testProduct.id, function (err, req, res, prod) {
//                     if (err) console.log("Oops : ", err);
//                     else console.log('Product with ID :' + testProduct.id + ' :: ', prod);
//                     console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
 
//                     client.del('/customer/' + testProduct.id, function (err, req, res, status) {
//                         if (err) console.log("Oops : ", err);
//                         else console.log('Product deleted status :', status);
//                         console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
//                         client.get('/customer', function (err, req, res, products) {
//                             if (err) console.log("Oops : ", err);
//                             else console.log('Total products : ', products.length);
//                             console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");  
//                         });
 
//                     });
//                 });
//             });
//         });
//     });
// });
// 'use strict'

// module.exports = function(ctx) {

//     // extract context from passed in object
//     const db     = ctx.db,
//           server = ctx.server

//     // assign collection to variable for further use
//     const collection = db.collection('todos')

//     /**
//      * Create
//      */
//     server.post('/todos', (req, res, next) => {

//         // extract data from body and add timestamps
//         const data = Object.assign({}, req.body, {
//             created: new Date(),
//             updated: new Date()
//         })

//         // insert one object into todos collection
//         collection.insertOne(data)
//             .then(doc => res.send(200, doc.ops[0]))
//             .catch(err => res.send(500, err))

//         next()

//     })

//     /**
//      * Read
//      */
//     server.get('/todos', (req, res, next) => {

//         let limit = parseInt(req.query.limit, 10) || 10, // default limit to 10 docs
//             skip  = parseInt(req.query.skip, 10) || 0, // default skip to 0 docs
//             query = req.query || {}

//         // remove skip and limit from query to avoid false querying
//         delete query.skip
//         delete query.limit

//         // find todos and convert to array (with optional query, skip and limit)
//         collection.find(query).skip(skip).limit(limit).toArray()
//             .then(docs => res.send(200, docs))
//             .catch(err => res.send(500, err))

//         next()

//     })

//     /**
//      * Update
//      */
//     server.put('/todos/:id', (req, res, next) => {

//         // extract data from body and add timestamps
//         const data = Object.assign({}, req.body, {
//             updated: new Date()
//         })

//         // build out findOneAndUpdate variables to keep things organized
//         let query = { _id: req.params.id },
//             body  = { $set: data },
//             opts  = {
//                 returnOriginal: false,
//                 upsert: true
//             }

//         // find and update document based on passed in id (via route)
//         collection.findOneAndUpdate(query, body, opts)
//             .then(doc => res.send(204))
//             .catch(err => res.send(500, err))

//         next()

//     })

//     /**
//      * Delete
//      */
//     server.del('/todos/:id', (req, res, next) => {

//         // remove one document based on passed in id (via route)
//         collection.findOneAndDelete({ _id: req.params.id })
//             .then(doc => res.send(204))
//             .catch(err => res.send(500, err))

//         next()

//     })

// }
