module.exports = app => {
    let submissionModel = require('../models/submission/submission.model.server');

    submitQuiz = (req, res) => {
        let submission = req.body;
        let currentUser = req.session['currentUser'];
        submissionModel.createSubmission(submission, currentUser)
            .then(submission => res.json(submission))
    };

    findSubmissions = (req, res) => {
        let quizId = req.params['quizId'];
        let currentUser = req.session['currentUser'];
        submissionModel.findSubmissions(quizId, currentUser)
            .then(submission => res.json(submission))

    };

    findSubmission = (req, res) => {
        let submissionId = req.params['submissionId'];
        let currentUser = req.session['currentUser'];
        submissionModel.findSubmission(submissionId, currentUser)
            .then(submission => res.json(submission))

    };


    app.post('/api/quiz/:quizId/submission', submitQuiz);
    app.get('/api/quiz/:quizId/submission', findSubmissions);
    app.get('/api/quiz/:quizId/submission/:submissionId', findSubmission);
};

