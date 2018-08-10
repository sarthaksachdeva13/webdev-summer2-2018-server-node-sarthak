var mongoose = require('mongoose');

module.exports = mongoose.Schema({
    username: String,
    quizId: String,
    answers: Object,
    timeSubmitted:   { type : Date, default: Date.now }
}, {collection: 'submissions'});