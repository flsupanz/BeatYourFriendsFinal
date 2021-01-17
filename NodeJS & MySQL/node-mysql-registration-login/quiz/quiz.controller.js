
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
// const userService = require('./user.service');
const quizService = require('./quiz.service');

// routes
// router.post('/authenticate', authenticateSchema, authenticate);
router.post('/addQuiz', authorize(), quizSchema, addQuiz);
router.get('/getAllQuiz', authorize(), getAllQuiz);
// router.get('/current', c(), getCurrent);
// router.get('/:quizId', authorize(), getQuizById);
router.put('/:id', authorize(), quizSchema, updateQuiz);
// router.delete('/:id', authorize(), _delete);

module.exports = router;

// function authenticateSchema(req, res, next) {
//   const schema = Joi.object({
//     username: Joi.string().required(),
//     password: Joi.string().required()
//   });
//   validateRequest(req, next, schema);
// }

// function authenticate(req, res, next) {
//   userService.authenticate(req.body)
//     .then(user => res.json(user))
//     .catch(next);
// }

function quizSchema(req, res, next) {
  const schema = Joi.object({
    // quizId: Joi.number().required(),
    player1Id: Joi.number().required(),
    player2Id: Joi.number().required(),
    testStartPlayer1: Joi.date().allow(null),
    testStartPlayer2: Joi.date().allow(null),
    testEndPlayer1: Joi.date().allow(null),
    testEndPlayer2: Joi.date().allow(null),
    totalQuestions: Joi.number().required(),
    testType: Joi.string().required(),
    correctAnswersPlayer1: Joi.number().allow(null),
    correctAnswersPlayer2: Joi.number().allow(null),

    // firstName: Joi.string().required(),
    // lastName: Joi.string().required(),
    // username: Joi.string().required(),
    // password: Joi.string().min(4).required()
  });
  validateRequest(req, next, schema);
  // console.log(result);
}


function quizSchemaUpdate(req, res, next) {
  const schema = Joi.object({
    // quizId: Joi.number().required(),
    player1Id: Joi.number().empty(''),
    player2Id: Joi.number().empty(''),
    testStartPlayer1: Joi.date().empty('').allow(null),
    testStartPlayer2: Joi.date().empty('').allow(null),
    testEndPlayer1: Joi.date().empty('').allow(null),
    testEndPlayer2: Joi.date().empty('').allow(null),
    totalQuestions: Joi.number().empty(''),
    testType: Joi.number().empty(''),
    correctAnswersPlayer1: Joi.number().empty('').allow(null),
    correctAnswersPlayer2: Joi.number().empty('').allow(null),

    // firstName: Joi.string().required(),
    // lastName: Joi.string().required(),
    // username: Joi.string().required(),
    // password: Joi.string().min(4).required()
  });
  validateRequest(req, next, schema);
  // console.log(result);
}

function addQuiz(req, res, next) {
  quizService.create(req.body)
    .then(() => res.json({ message: 'Quiz Added' }))
    .catch(next);
}

function getAllQuiz(req, res, next) {
  quizService.getAll()
    .then(quizes => res.json(quizes))
    .catch(next);
}

// function getCurrent(req, res, next) {
//   res.json(req.user);
// }

// function getQuizById(req, res, next) {
//   quizService.getById(req.params.quidId)
//     .then(quiz => res.json(quiz))
//     .catch(next);
// }

// function updateSchema(req, res, next) {
//   const schema = Joi.object({
//     firstName: Joi.string().empty(''),
//     lastName: Joi.string().empty(''),
//     username: Joi.string().empty(''),
//     password: Joi.string().min(6).empty('')
//   });
//   validateRequest(req, next, schema);
// }

function updateQuiz(req, res, next) {
  quizService.update(req.params.id, req.body)
    .then(quiz => res.json(quiz))
    .catch(next);
}

// function _delete(req, res, next) {
//   userService.delete(req.params.id)
//     .then(() => res.json({ message: 'User deleted successfully' }))
//     .catch(next);
// }
