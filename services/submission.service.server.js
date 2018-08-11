module.exports = function (app) {


    let submissionModel = require('../models/submission/submission.model.server');

    createSubmission = (req, res) => {
        let quizId = req.params.quizId;
        let studentId = req.params['studentId'];
        let submission = req.body;
        submissionModel
            .submitQuiz(submission, quizId, studentId)
            .then(submission => res.json(submission));
    };

    getSubmissionById = (req, res) => {
        let quizId = req.params.quizId;
        let studentId = req.params['studentId'];
        let submissionId = req.params['submissionId'];
        submissionModel
            .findSubmissionById(studentId, submissionId)
            .then(submission => res.json(submission));
    };

    getSubmissionsByStudentId = (req, res) => {
        let quizId = req.params.quizId;
        let studentId = req.params['studentId'];
        submissionModel
            .findQuizSubmissionsByStudent(quizId, studentId)
            .then(submission => res.json(submission));
    };

    getSubmission = (req, res) => {
        let quizId = req.params.quizId;
        let submissionId = req.params['submissionId'];
        submissionModel
            .findSubmission(submissionId, quizId)
            .then(submission => res.json(submission));
    };


    app.post('/api/quiz/:qID/student/:studentId/submission', createSubmission);
    app.get('/api/quiz/:qID/student/:studentId/submission', getSubmissionsByStudentId);
    app.get('/api/quiz/:qID/student/:studentId/submission/:submissionId', getSubmissionById);
    app.get('/api/quiz/:qID/submission/:submissionId', getSubmission);
}