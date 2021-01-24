const db = require("_helpers/db");

module.exports = {
  getAll,
  create,
  update,
};

async function getAll() {
  return await db.Quiz.findAll();
}


async function create(params) {
  // save quiz
  await db.Quiz.create(params);
}

async function update(id, params) {
  const quiz = await getQuiz(id);

  // copy params to quiz and save
  Object.assign(quiz, params);
  await quiz.save();
}


// helper functions

async function getQuiz(id) {
  const quiz = await db.Quiz.findByPk(id);
  if (!quiz) throw "Quiz not found";
  return quiz;
}
