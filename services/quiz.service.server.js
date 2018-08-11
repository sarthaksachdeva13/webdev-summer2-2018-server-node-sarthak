module.exports = function (app) {


    let quizzes = require('./quizSchema.json');
    let submissionModel = require('../models/submission/submission.model.server');

    findQuizById = (req, res) => {
        let quiz = quizzes.filter(q =>
            q._id === req.params.quizId);
        res.json(quiz[0]);
    };

    findAllQuizzes = (req, res) =>
        res.json(quizzes);


    findSubmissionsForQuiz = (req, res) =>
        submissionModel.findSubmissionsForQuiz(req.params.quizId)
            .then(function (submissions) {
                res.json(submissions);
            });

    submitQuiz = (req, res) => {
        let submission = req.body;
        let quizId = req.params.quizId;
        let currentUser = req.session.currentUser.username;
        submissionModel
            .submitQuiz(submission, quizId, currentUser)
            .then(function (submission) {
                res.json(submission);
            })
    };


    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qID', findQuizById);
    app.post('/api/quiz/:qID', submitQuiz);
    app.get('/api/quiz/:qID/submissions', findSubmissionsForQuiz);

};