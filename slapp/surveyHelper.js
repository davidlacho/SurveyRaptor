const SlackBot = require('slackbots');
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const uuidv4 = require('uuid/v4');
const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[ENV]);

module.exports = (user, questionArray, recipientUserNames, slapp) => {

  const uniqueCallback = uuidv4();

  console.log(questionArray);
  const bot = new SlackBot({
    token: user.bot_access_token,
    name: 'Survey Raptor',
  });

  questionArray.unshift({
    question: 'Click to start',
    possibleAnswers: ['Start'],
  });

  const createMessage = (question, i) => {
    const questionObject = {
      text: 'Hey there! I have a few questions for you:',
      attachments: [{
        text: question.question,
        fallback: 'Yes or No?',
        callback_id: `${uniqueCallback}/${i}`,
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

  const messageArray = questionArray.map((question, i) => createMessage(question, i));

  const createNewRoute = (routeNumber, arrIndex) => {
    slapp.route(routeNumber, (message) => {
      const newCurrentArray = arrIndex + 1;
      const usersResponse = message.body.event && message.body.event.text;
      console.log('THE USERS RESPONSE: ', usersResponse);
      const dbQuestionID = questionArray[arrIndex + 1].question_id;
      const dbSurveyID = questionArray[arrIndex + 1].survey_id;
      console.log('dbQuestionID', dbQuestionID, 'dbSurveyID', dbSurveyID);

      if (messageArray[newCurrentArray + 1]) {
        if (messageArray[newCurrentArray + 1].attachments[0].actions.length >= 1) {
          message.say(messageArray[newCurrentArray + 1]);
        } else {
          const newRandom = uuidv4();
          message.say(messageArray[newCurrentArray + 1]).route(newRandom);
          createNewRoute(newRandom, newCurrentArray);
        }
      } else {
        message.say("That's all! Thanks!");
      }
    });
  };

  slapp.action(`${uniqueCallback}/:arrayIndex`, 'answer', (msg, value) => {
    console.log('THE USERS RESPONSE: ', value);
    const arrIndex = Number(msg.body.callback_id.split('/')[1]);
    const dbQuestionID = questionArray[arrIndex].question_id;
    const dbSurveyID = questionArray[arrIndex].survey_id;
    console.log('dbQuestionID', dbQuestionID, 'dbSurveyID', dbSurveyID);
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

  console.log('USERS WILL BE ASKED: ', messageArray);

  recipientUserNames.forEach((recipient) => {
    bot.postMessageToUser(recipient, '', messageArray[0]);
  });

  return slapp;
};
