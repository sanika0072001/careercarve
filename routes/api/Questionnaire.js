const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const User = require("../../model/Questionnaire");
const { Test, UserAnswer } = require('./models');

router.post('/submit-test', async (req, res) => {
  const { userId, testId, answers } = req.body;

  try {
    // Check if user already completed the test
    const previousTest = await UserAnswer.findOne({ userId, testId });
    if (previousTest) {
      return res.status(400).json({ message: 'User has already completed this test' });
    }

    // Get test details
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Calculate score
    let score = 0;
    for (const userAnswer of answers) {
      const question = test.questions.find(q => q.questionId === userAnswer.questionId);
      if (JSON.stringify(question.correctAnswers.sort()) === JSON.stringify(userAnswer.answer.sort())) {
        score += 1;
      }
    }

    // Store user's answers and score
    const userAnswer = new UserAnswer({
      userId,
      testId,
      answers,
      score,
    });
    await userAnswer.save();

    res.status(201).json({
      userId,
      testId,
      score,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
