const express = require('express');
const passport = require('passport');

const router = express.Router();

// API endpoints, do not prefix with '/api'
module.exports = (knex) => {
  // Serves the logged in user data
  router.get('/userdata', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    knex('users')
      .join('slack_bots', 'slack_bots.creator_id', '=', 'users.slack_id')
      .select('name', 'email', 'image_24', 'image_32', 'image_48', 'image_72', 'image_192', 'image_512', 'team_name')
      .where('slack_id', req.user.creator_id)
      .then((rows) => {
        res.json(rows);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.post('/buildsurvey', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    const insertToQuantitativeAnswers = (questionID, possibleAnswers) => {
      possibleAnswers.forEach((possibleAnswer) => {
        knex('quantiative_possible_answers')
          .insert({
            question_id: questionID,
            possible_answers: possibleAnswer,
          })
          .catch((err) => {
            console.log(err);
          });
      });
      res.status(201).json('ok');
    };

    const insertToQuestionTable = (surveyID) => {
      req.body.questions.forEach((question) => {
        const questionType = question.possibleAnswers ? 'quantitative' : 'qualitative';
        knex('questions')
          .insert({
            survey_id: surveyID[0],
            question_type: questionType,
            question: question.question,
          })
          .returning('id')
          .then((id) => {
            if (questionType === 'quantitative') {
              insertToQuantitativeAnswers(id, question.possibleAnswers);
            } else {
              res.status(201).json('ok');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };

    const insertToSurveys = (userID) => {
      knex('surveys')
        .insert({
          user_id: userID[0].id,
        })
        .returning('id')
        .then((surveyID) => {
          insertToQuestionTable(surveyID);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    knex('users')
      .select('id')
      .where('slack_id', req.user.creator_id)
      .then((userID) => {
        insertToSurveys(userID);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return router;
};
