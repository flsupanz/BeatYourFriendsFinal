
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const quizService = require('./quiz.service');

// routes
router.post('/addQuiz', authorize(), quizSchema, addQuiz);
router.get('/getAllQuiz', authorize(), getAllQuiz);
router.put('/:id', authorize(), quizSchema, updateQuiz);

module.exports = router;

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

function updateQuiz(req, res, next) {
  quizService.update(req.params.id, req.body)
    .then(quiz => res.json(quiz))
    .catch(next);
}
