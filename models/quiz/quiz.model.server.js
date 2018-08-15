const mongoose = require('mongoose')
let quizSchema = require('./quiz.schema.server');
let quizModel = mongoose.model('QuizModel', quizSchema);


findAllQuizzes = () =>
    quizModel.find();

findQuizById = qID =>
    quizModel.findOne({_id: qID})
        .populate('questions')
        .exec();

module.exports = {
    findAllQuizzes,
    findQuizById
};