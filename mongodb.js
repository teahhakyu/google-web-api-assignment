

var mongoose = require('mongoose')

var customerSchema = mongoose.Schema({
    place: String,
    country: String,
    state: String,
    activity: String
});

module.exports = mongoose.model('Customer', customerSchema);


// 'use strict'

// const mongoose = require('mongoose'),
//       mongooseApiQuery = require('mongoose-api-query'),
//       createdModified = require('mongoose-createdmodified').createdModifiedPlugin

// const TodoSchema = new mongoose.Schema({
//     task: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     status: {
//         enum: ['pending', 'complete', 'overdue']
//     },
// }, { minimize: false });


// TodoSchema.plugin(mongooseApiQuery)
// TodoSchema.plugin(createdModified, { index: true })

// const Todo = mongoose.model('Todo', TodoSchema)
// module.exports = Todo
