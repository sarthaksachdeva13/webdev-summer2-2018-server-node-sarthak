const mongoose = require('mongoose')
let quizSchema = require('./quiz.schema.server');
let quizModel = mongoose.model('QuizModel', quizSchema);


findAllQuizzes = () =>
    quizModel.find();

findQuizById = qID =>
    quizModel.findOne({_id: qID})
        .populate('questions')
        .exec();

createQuiz = quiz =>
    quizModel.create(quiz);

updateQuiz = (quizId, newQuiz) =>
    quizModel.update({_id: quizId}, {
        $set: newQuiz
    });

addQuestion = (quizId, questionId) =>
    quizModel.update({_id: quizId}, {
        $push: {questions: questionId}
    });

module.exports = {
    findAllQuizzes,
    createQuiz,
    updateQuiz,
    addQuestion,
    findQuizById
};