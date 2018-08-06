module.exports = app => {

    let sectionModel = require('../models/sections/section.model.server');
    let enrollmentModel = require('../models/enrollment/enrollment.model.server');

    deleteSection = (req, res) => {
        let sectionId = req.params.sectionId;
        let currentUser = req.session.currentUser;
        let studentId = currentUser._id;
        enrollmentModel.deleteEnrollment(sectionId, studentId)
            .then(function () {
                sectionModel.deleteSection(sectionId)
                    .then(obj => res.sendStatus(200))
            })
    };

    deEnrollStudent = (req, res) => {
        let sectionId = req.params['sectionId'];
        let currentUser = req.session.currentUser;
        if (currentUser !== undefined) {
            let studentId = currentUser._id;
            sectionModel.increaseNoOfSeats(sectionId)
                .then(() => {
                    enrollmentModel.deleteEnrollment(sectionId, studentId)
                        .then(obj => {
                            if (obj.n > 0) {
                                res.sendStatus(200);
                            }
                        })
                })
        } else {
            res.sendStatus(500);
        }
    };

    updateSection = (req, res) => {
        let newSection = req.body;
        let sectionId = req.params.sectionId;
        sectionModel.findSectionById(sectionId)
            .then(object => {
                let currentSection = object._doc;
                newSection.availableSeats = currentSection.availableSeats +
                    (newSection.seats - currentSection.seats);
                sectionModel.updateSection(newSection, sectionId)
                    .then(obj => res.json(newSection))
            })
    };

    findSectionsForStudent = (req, res) => {
        let currentUser = req.session.currentUser;
        let studentId = currentUser._id;
        if (currentUser !== undefined) {
            enrollmentModel
                .findSectionsForStudent(studentId)
                .then(enrollments => res.json(enrollments));
        }
    };


    enrollStudentInSection = (req, res) => {
        let sectionId = req.params.sectionId;
        let currentUser = req.session.currentUser;
        if (currentUser !== undefined) {
            let studentId = currentUser._id;
            let enrollment = {
                student: studentId,
                section: sectionId
            };
            sectionModel
                .decreaseNoOfSeats(sectionId)
                .then(() => enrollmentModel.enrollStudentInSection(enrollment))
                .then(enrollment => res.json(enrollment))
        } else {
            res.sendStatus(500);
        }
    };

    findSectionsForCourse = (req, res) => {
        let courseId = req.params['courseId'];
        sectionModel.findAllSectionsForCourse(courseId)
            .then(sections => res.json(sections))
    };

    createSection = (req, res) => {
        let section = req.body;
        sectionModel.createSection(section)
            .then(section => res.json(section))
    };

    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
    app.get('/api/student/section', findSectionsForStudent);
    app.put('/api/course/:courseId/section/:sectionId/update', updateSection);
    app.delete('/api/section/:sectionId/delete', deleteSection);
    app.delete('/api/section/:sectionId/deRegister', deEnrollStudent);
};