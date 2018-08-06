const mongoose = require('mongoose');
const sectionSchema = require('./section.schema.server');

const sectionModel = mongoose.model('SectionModel', sectionSchema);
const userModel = require('../user/user.model.server');

findSectionById = (sectionId) =>
    sectionModel.findById(sectionId);

deleteSection = (sectionId) =>
    sectionModel.deleteOne({_id: sectionId});


updateSection = (newSection, sectionId) =>
    sectionModel.updateOne({_id: sectionId}, {
        $set:
            {
                courseId: newSection.courseId,
                name: newSection.name,
                seats: newSection.seats,
                availableSeats: newSection.availableSeats
            }
    });

findAllSections = () =>
    sectionModel.find();

findAllSectionsForCourse = courseId =>
    sectionModel.find({courseId: courseId});

createSection = section =>
    sectionModel.create(section);

enroll = (userId, sectionId) =>
    userModel.findUserById(userId)
        .then(user => {
            user.sections.push(sectionId);
            return user.save();
        });

decreaseNoOfSeats = sectionId =>
    sectionModel.update({_id: sectionId},
        {$inc: {availableSeats: -1}});

increaseNoOfSeats = sectionId =>
    sectionModel.update({_id: sectionId},
        {$inc: {availableSeats: +1}});


module.exports = {
    findAllSectionsForCourse,
    createSection,
    findSectionById,
    deleteSection,
    updateSection,
    decreaseNoOfSeats,
    increaseNoOfSeats
};