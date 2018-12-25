const SlackBot = require('slackbots');
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const bot = new SlackBot({
  token: process.env.SLACK_BOT_TEST_TOKEN,
  name: 'Survey Raptor',
});

module.exports = (slapp) => {

  // Make sure to pass in users later:
  const users = ['david.lacho', 'DavidTest'];

  // Make sure to pass in questions later:
  const questions = [{
    question: 'first question',
    possibleAnswers: ['A', 'B', 'C', 'D'],
  },
  {
    question: 'Who is the coolest?',
    possibleAnswers: ['David', 'Jess', 'Andy', 'Jack'],
  },
  {
    question: 'Why am I alone?',
  },
];

  const createMessage = (question, i) => {
    const questionObject = {
      text: 'Hey there! I have a survey for you:',
      attachments: [{
        text: question.question,
        fallback: 'Yes or No?',
        callback_id: `question_callback/${i}`,
        actions: [],
      }],
    };

    const actions = [];
    if (question.possibleAnswers) {
      question.possibleAnswers.forEach((possibleAnswer) => {
        actions.push({
          name: 'answer',
          text: possibleAnswer,
          type: 'button',
          value: possibleAnswer,
        });
      });
    }
    questionObject.attachments[0].actions = actions;
    return questionObject;
  };

  const messageArray = questions.map((question, i) => createMessage(question, i));

  slapp.action('question_callback/:arrayIndex', 'answer', (msg, value) => {
    const currentarrayIndex = Number(msg.body.callback_id.split('/')[1]);
    if (messageArray[currentarrayIndex + 1]) {
      msg.respond(msg.body.response_url, messageArray[currentarrayIndex + 1]);
    } else {
      msg.respond(msg.body.response_url, "That's all! Thanks!");
    }
  });

  users.forEach((user) => {
    bot.postMessageToUser(user, '', messageArray[0]);
  });

  return slapp;
};
