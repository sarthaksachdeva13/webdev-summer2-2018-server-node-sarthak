module.exports = app => {

    let quizModel = require('../models/quiz/quiz.model.server');

    const questionModel = require('../models/question/question.model.server')

    createQuestion = (req, res) =>
        questionModel
            .createQuestion(req.body)
            .then(
                question => res.json(question),
                error => res.send(error)
            );

    findAllQuizzes = (req, res) =>
        quizModel.findAllQuizzes()
            .then(quizzes => res.json(quizzes));

    createQuiz = (req, res) => {
        quizModel.createQuiz(req.body)
            .then(quiz => res.send(quiz))
    };

    updateQuiz = (req, res) => {
        quizModel.updateQuiz(req.params.qid, req.body)
            .then(status => res.send(status))
    };



    findQuizById = (req, res) =>
        quizModel.findQuizById(req.params['quizId'])
            .then(quizzes => res.json(quizzes));


    deleteQuiz = (req, res) => {
        quizModel.deleteQuiz(req.params.qid)
            .then(status => res.send(status))
    };

    addQuestion = (req, res) => {
        quizModel
            .addQuestion(req.params.qid, req.params.questionId)
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    };

    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:quizId', findQuizById);
    app.put('/api/quiz/:qid', updateQuiz);
    app.delete('/api/quiz/:qid', deleteQuiz);
    app.put('/api/quiz/:qid/question/:questionId', addQuestion);
    app.post('/api/question', createQuestion);


};

