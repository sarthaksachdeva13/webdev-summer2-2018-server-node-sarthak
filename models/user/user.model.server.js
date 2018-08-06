const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);

findAllUsers = () =>
    userModel.find();

findUserByCredentials = (username, password) =>
    userModel.findOne({username: username, password: password});

findUserById = userId =>
    userModel.findById(userId);

createUser = user =>
    userModel.create(user);

findUserByUsername = username =>
    userModel.find({username: username});

validateUsername = username =>
    userModel.find({username: username}).count();


updateUser = (currentUser, user) =>
    userModel.updateOne({
        _id: currentUser._id
    }, {
        $set: {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            address: user.address,
            email: user.email
        }
    });


module.exports = {
    findUserByUsername,
    createUser,
    updateUser,
    validateUsername,
    findUserById,
    findAllUsers,
    findUserByCredentials
};