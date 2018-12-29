const SlackBot = require('slackbots');
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const uuidv4 = require('uuid/v4');
const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[ENV]);

const addResponseToDB = (slackID, userName, response, responseType, questionID, surveyID) => {
  if (questionID && surveyID) {
    knex('respondents')
      .select('*')
      .where('survey_id', surveyID)
      .andWhere('slack_id', slackID)
      .then((rows) => {
        if (rows.length === 0) {
          return knex('respondents')
            .insert({
              slack_id: slackID,
              survey_id: surveyID,
              name: userName,
            })
            .returning('*');
        }
        return rows;
      })
      .then((respondentRows) => {
        if (responseType === 'qualitative') {
          knex('qualitative_answers')
            .insert({
              question_id: questionID,
              respondent_id: respondentRows[0].id,
              answer: response,
            })
            .returning('*')
            .then((resp) => {
              console.log(resp);
            })
            .catch((err) => {
              console.log('there was an err inserting into qualitative_answers', err);
            });
        } else {
          knex('quantiative_possible_answers')
            .select('id')
            .where('question_id', questionID)
            .andWhere('possible_answers', response)
            .then((id) => {
              knex('quantiative_answers')
                .insert({
                  question_id: questionID,
                  respondent_id: respondentRows[0].id,
                  answer: response,
                  quantiative_possible_answers_id: id[0].id,
                })
                .returning('*')
                .then((resp) => {
                  console.log(resp);
                })
                .catch((err) => {
                  console.log('there was an err inserting into quantiative_answers', err);
                });
            })
            .catch((err) => {
              console.log('there was an err in getting quantiative_possible_answers', err);
            });
        }
      })
      .catch((err) => {
        console.log('error putting into respondents', err);
      });
  }
};

module.exports = (user, questionArray, recipientUserNames, slapp) => {
  questionArray.sort((a, b) => a.index - b.index);

  const uniqueCallback = uuidv4();

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
      // console.log('THE USERS RESPONSE: ', usersResponse);
      const dbQuestionID = questionArray[arrIndex + 1].question_id;
      const dbSurveyID = questionArray[arrIndex + 1].survey_id;
      // console.log('dbQuestionID', dbQuestionID, 'dbSurveyID', dbSurveyID);
      bot.getUserById(message.body.event.user)
        .then((resp) => {
          addResponseToDB(resp.id, resp.name, usersResponse, 'qualitative', dbQuestionID, dbSurveyID);
        });
      if (messageArray[newCurrentArray + 1]) {
        if (messageArray[newCurrentArray + 1].attachments[0].actions.length >= 1) {
          message.say(messageArray[newCurrentArray + 1]);
        } else {
          const newRandom = uuidv4();
          message.say(messageArray[newCurrentArray + 1]).route(newRandom);
          createNewRoute(newRandom, newCurrentArray);
        }
      } else {
        message.say("That's all! Thanks! :smile:");
      }
    });
  };

  slapp.action(`${uniqueCallback}/:arrayIndex`, 'answer', (msg, value) => {
    const arrIndex = Number(msg.body.callback_id.split('/')[1]);
    const dbQuestionID = questionArray[arrIndex].question_id;
    const dbSurveyID = questionArray[arrIndex].survey_id;
    addResponseToDB(msg.body.user.id, msg.body.user.name, value, 'quantitative', dbQuestionID, dbSurveyID);
    if (messageArray[arrIndex + 1]) {
      const randomRoute = uuidv4();
      if (messageArray[arrIndex + 1] &&
        messageArray[arrIndex + 1].attachments[0].actions.length >= 1) {
        msg.respond(msg.body.response_url, messageArray[arrIndex + 1]);
      } else {
        msg.respond(messageArray[arrIndex + 1]).route(randomRoute);
        createNewRoute(randomRoute, arrIndex);
      }
    } else {
      msg.respond(msg.body.response_url, "That's all! Thanks!");
    }
  });

  recipientUserNames.forEach((recipient) => {
    bot.postMessageToUser(recipient, '', messageArray[0]);
  });

  return slapp;
};
