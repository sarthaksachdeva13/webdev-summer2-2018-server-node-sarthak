const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizModel'
    },
    answers: [{
        title: String,
        points: Number,
        description: String,
        choices: [{
            text: String,
            choiceValue: String
        }],
        blanks: [String],
        questionType: {
            type: String,
            enum: ['ESSAY', 'FILL_BLANKS', 'TRUE_FALSE', 'CHOICE']
        },
        essayAnswer: String,
        fillBlanksAnswers: Object,
        trueFalseAnswer: Boolean,
        multipleChoiceAnswer: String
    }],
    submissionTime: {type: Date}
}, {collection: 'submission'});
