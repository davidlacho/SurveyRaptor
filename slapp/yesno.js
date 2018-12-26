const SlackBot = require('slackbots');
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const uuidv4 = require('uuid/v4');

// NEED TO GET TOKEN FROM USER
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
      question: 'What am I?',
    },
    {
      question: 'No really, What am I?',
    },
    {
      question: 'last question',
      possibleAnswers: ['A', 'B', 'C', 'D'],
    },
  ];

  questions.unshift({
    question: 'Click to start',
    possibleAnswers: ['Start'],
  });

  const createMessage = (question, i) => {

    const questionObject = {
      text: 'Hey there! I have a few questions for you:',
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
      questionObject.attachments[0].actions = actions;
    }
    return questionObject;
  };

  const messageArray = questions.map((question, i) => createMessage(question, i));

  const createNewRoute = (routeNumber, arrIndex) => {
    slapp.route(routeNumber, (message) => {
      const newCurrentArray = arrIndex + 1;
      const usersResponse = message.body.event && message.body.event.text;
      console.log('THE USERS RESPONSE: ', usersResponse);
      if (messageArray[newCurrentArray + 1]) {
        if (messageArray[newCurrentArray + 1].attachments[0].actions.length >= 1) {
          message.say(messageArray[newCurrentArray + 1]);
        } else {
          const newRandom = uuidv4();
          message.say(messageArray[newCurrentArray + 1]).route(newRandom);
          createNewRoute(newRandom, newCurrentArray);
        }
        message.respond(message.body.response_url, "That's all! Thanks!");
      }
    });
  };

  slapp.action('question_callback/:arrayIndex', 'answer', (msg, value) => {
    console.log('THE USERS RESPONSE: ', value);
    const arrIndex = Number(msg.body.callback_id.split('/')[1]);
    if (messageArray[arrIndex + 1]) {
      const randomRoute = uuidv4();
      if (messageArray[arrIndex + 1]
        && messageArray[arrIndex + 1].attachments[0].actions.length >= 1) {
        msg.respond(msg.body.response_url, messageArray[arrIndex + 1]);
      } else {
        msg.respond(messageArray[arrIndex + 1]).route(randomRoute);
        createNewRoute(randomRoute, arrIndex);
      }
    } else {
      msg.respond(msg.body.response_url, "That's all! Thanks!");
    }
  });

  users.forEach((user) => {
    bot.postMessageToUser(user, '', messageArray[0]);
  });

  return slapp;
};
