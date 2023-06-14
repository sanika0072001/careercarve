const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  questions: [{
    questionId: String,
    questionText: String,
    correctAnswer: String,
  }]
});

const Test = mongoose.model('Test', testSchema);

module.exports = { Test };
const mongoose = require('mongoose');
const { Test } = require('./models');

// Initialize mongoose connection
mongoose.connect('your_mongodb_uri', { useNewUrlParser: true, useUnifiedTopology: true });

const createTests = async () => {
  const tests = [
    {
      _id: new mongoose.Types.ObjectId(),
      questions: [
        {
          questionId: '1',
          questionText: 'What is the color of an apple?',
          correctAnswer: 'Red',
        },
        {
          questionId: '2',
          questionText: 'How many bones are there in the human body?',
          correctAnswer: '206',
        },
      ],
    },
    {
      _id: new mongoose.Types.ObjectId(),
      questions: [
        {
          questionId: '3',
          questionText: 'What is the color of a parrot?',
          correctAnswer: 'Green',
        },
        {
          questionId: '4',
          questionText: 'How many colors are there in a rainbow?',
          correctAnswer: '7',
        },
      ],
    },
  ];

  // Save tests in the database
  for (const test of tests) {
    const newTest = new Test(test);
    await newTest.save();
  }

  console.log('Tests saved successfully');
};

createTests();
