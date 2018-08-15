module.exports = app => {

    let quizModel = require('../models/quiz/quiz.model.server');

    findAllQuizzes = (req, res) =>
        quizModel.findAllQuizzes()
            .then(quizzes => res.json(quizzes));


    findQuizById = (req, res) =>
        quizModel.findQuizById(req.params['quizId'])
            .then(quizzes => res.json(quizzes));


    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:quizId', findQuizById);

};

