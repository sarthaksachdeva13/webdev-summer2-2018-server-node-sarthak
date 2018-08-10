var mongoose = require('mongoose');
var submissionSchema = require('./submission.schema.server');
var submissionModel = mongoose.model('SubmissionModel', submissionSchema
);

findSubmissionsForQuiz = quizId =>
    submissionModel.find({quizId: quizId});

findSubmissionsForUser = username =>
    submissionModel.find({username: username});

submitQuiz = (submission, quizId, username) =>
    submissionModel.create({
        quizId: quizId,
        username: username,
        answers: submission
    });

findQuizSubmissionsByStudent = (quizId, student) =>
    submissionModel.find({quizId: quizId, username: student});


findSubmissionById = (studentId, submissionId) =>
    submissionModel.find({username: studentId, _id: submissionId});


findSubmission = (submissionId, quizId) =>
    submissionModel.findOne({
        _id: submissionId,
        quizId: quizId
    });

module.exports = {
    submitQuiz,
    findSubmissionsForQuiz,
    findSubmissionsForUser,
    findSubmissionById,
    findQuizSubmissionsByStudent,
    findSubmission
};