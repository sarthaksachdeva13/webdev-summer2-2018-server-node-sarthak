module.exports = app => {

    const userModel = require('../models/user/user.model.server');

    findAllUsers = (req, res) =>
        userModel.findAllUsers()
            .then(users => {
                res.send(users);
            });

    login = (req, res) => {
        const user = req.body;
        userModel.findUserByCredentials(user.username, user.password)
            .then(user => {
                req.session['currentUser'] = user;
                res.send(req.session['currentUser']);
            });
    };

    profile = (req, res) => {
        let user = req.session['currentUser'];
        userModel.findUserByUsername(user.username)
            .then(u => {
                res.json(u);
            })
    };

    logout = (req, res) => {
        req.session.destroy();
        res.send(200);
    };

    findUserById = (req, res) => {
        const id = req.params['userId'];
        userModel.findUserById(id)
            .then(user => {
                res.json(user);
            })
    };


    authenticate = (req, res) => {
        const currentUser = req.session.currentUser;
        if (currentUser !== undefined) {
            res.json({username: currentUser.username});
        } else {
            res.json({username: ''});
        }
    };

    update = (req, res) => {
        const user = req.body;
        const currentUser = req.session.currentUser;
        if (currentUser._id !== undefined) {
            userModel.updateUser(currentUser, user)
                .then(obj => {
                    if (obj.nModified > 0)
                        req.session['currentUser'] = user;
                    res.json(user);
                })
        }
    };


    createUser = (req, res) => {
        const user = req.body;
        userModel.validateUsername(user.username)
            .then(response => {
                if (response === 0) {
                    userModel.createUser(user)
                        .then(user => {
                            req.session['currentUser'] = user._doc;
                            req.session.cookie._expires = new Date(Date.now() + (30 * 60 * 1000));
                            res.json(user._doc);
                        })
                } else {
                    res.send({message: "User exists!"});
                }
            });

    };


    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.put('/api/user/update', update);
    app.get('/api/auth', authenticate);
};