const mongoose = require('mongoose');
let submissionSchema = require('./submission.schema.server');
let submissionModel = mongoose.model('SubmissionModel', submissionSchema);


createSubmission = (quiz, student) => {

    let answers = [];

    quiz.questions.forEach(question => {
        switch (question.questionType) {
            case 'ESSAY':
                answers.push({
                    title: question.title,
                    points: question.points,
                    description: question.description,
                    choices: question.choices,
                    blanks: question.blanks,
                    questionType: question.questionType,
                    essayAnswer: question.essayAnswer
                });
                break;
            case 'FILL_BLANKS':
                answers.push({
                    title: question.title,
                    points: question.points,
                    description: question.description,
                    choices: question.choices,
                    blanks: question.blanks,
                    questionType: question.questionType,
                    fillBlanksAnswers: question.fillBlanksAnswers
                });
                break;
            case 'TRUE_FALSE':
                answers.push({
                    title: question.title,
                    points: question.points,
                    description: question.description,
                    choices: question.choices,
                    blanks: question.blanks,
                    questionType: question.questionType,
                    trueFalseAnswer: question.trueFalseAnswer
                });
                break;
            case 'CHOICE':
                answers.push({
                    title: question.title,
                    points: question.points,
                    description: question.description,
                    choices: question.choices,
                    blanks: question.blanks,
                    questionType: question.questionType,
                    multipleChoiceAnswer: question.multipleChoiceAnswer
                });
                break
        }
    });
    let submission = {
        quiz: quiz,
        student: student,
        submissionTime: new Date(),
        answers: answers
    };
    return submissionModel.create(submission)
};

findSubmissions = (qID, studentId) =>
    submissionModel.find({quiz: qID, student: studentId});

findSubmission = (submissionId, studentId) =>
    submissionModel.findOne({_id: submissionId, student: studentId})
        .populate('quiz')
        .exec();


module.exports = {
    createSubmission,
    findSubmissions,
    findSubmission
};