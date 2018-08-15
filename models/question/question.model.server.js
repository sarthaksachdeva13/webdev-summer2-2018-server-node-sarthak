const mongoose = require('mongoose');


let questionSchema = require('./question.schema.server');
let questionModel = mongoose.model('QuestionModel', questionSchema);


findAllQuestions = () =>
    questionModel.find();

findQuestionById = questionID =>
    questionModel.findOne({_id: questionId});

createQuestion = question =>
    questionModel.create(question)


module.exports = {
    findAllQuestions,
    findQuestionById,
    createQuestion
};