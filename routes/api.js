const express = require('express');
const passport = require('passport');
const SlackBot = require('slackbots');
const personality = require('../externals/watson/personality');


const deploySurvey = require('../slapp/surveyHelper');

const router = express.Router();

// API endpoints, do not prefix with '/api'
module.exports = (knex, slapp) => {
  // Serves the logged in user data

  router.post('/buildsurvey', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    const questionArray = [];

    for (const keys in req.body.questions) {
      questionArray.push(req.body.questions[keys]);
    }

    const insertToQuantitativeAnswers = (questionID, possibleAnswers) => {
      possibleAnswers.forEach((possibleAnswer) => {
        knex('quantiative_possible_answers')
          .insert({
            question_id: questionID[0],
            possible_answers: possibleAnswer,
          })
          .catch((err) => {
            res.status(500).send('Error occured when inserting possible answers:', err);
          });
      });
    };

    const insertToQuestionTable = (surveyID) => {
      const deploymentArray = [];
      questionArray.forEach((question, i) => {
        const questionType = question.possibleAnswers ? 'quantitative' : 'qualitative';
        const questionObject = {
          survey_id: surveyID[0],
          question_type: questionType,
          question: question.question,
        };
        knex('questions')
          .insert(questionObject)
          .returning('id')
          .then((id) => {
            questionObject.index = i;
            questionObject.question_id = id[0];
            if (questionType === 'quantitative') {
              insertToQuantitativeAnswers(id, question.possibleAnswers);
              questionObject.possibleAnswers = question.possibleAnswers;
            }
            deploymentArray.push(questionObject);
            if (questionArray.length === deploymentArray.length) {
              deploySurvey(req.user, deploymentArray, req.body.users, slapp);
              res.status(201).json(`{message: 'ok!', surveyID: ${surveyID}}`);
            }
          })
          .catch((err) => {
            res.status(500).send('Error occured when inserting into question table:', err);
          });
      });
    };

    const insertToSurveys = (userID) => {
      knex('surveys')
        .insert({
          user_id: userID[0].id,
          name: req.body.name,
        })
        .returning('id')
        .then((surveyID) => {
          insertToQuestionTable(surveyID);
        })
        .catch((err) => {
          res.status(500).send('Error occured when inserting into survey table:', err);
        });
    };

    knex('users')
      .select('id')
      .where('slack_id', req.user.creator_id)
      .then((userID) => {
        insertToSurveys(userID);
      })
      .catch((err) => {
        res.status(500).send('Error occured when getting user:', err);
      });
  });

  router.get('/team', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    const bot = new SlackBot({
      token: req.user.bot_access_token,
      name: 'Survey Raptor',
    });
    bot.getUsers()
      .then((users) => {
        res.status(200).json(users.members);
      })
      .catch((err) => {
        res.status(500).send('Error occured when getting list of users from Slack:', err);
      });
  });

  router.get('/users/personality/:slackID', (req, res) => {
    personality(knex, req.params.slackID, (err, resp) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(resp);
      }
    });
  });

  router.get('/user', passport.authenticate('jwt', {
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

  router.get('/user/surveys', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    knex('surveys')
      .select('surveys.id', 'surveys.created_at', 'surveys.name')
      .join('users', 'surveys.user_id', 'users.id')
      .where('slack_id', req.user.creator_id)
      .then((resp) => {
        const returnArray = [];
        resp.forEach((response, i) => {
          knex('respondents')
            .select('*')
            .where('survey_id', response.id)
            .then((respondents) => {
              returnArray[i] = {
                surveyID: response.id,
                name: response.name,
                createdAt: response.created_at,
                respondentCount: respondents.length,
              };
              if (returnArray.length === resp.length) {
                res.status(200).json(returnArray);
              }
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  router.get('/user/surveys/:id', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    knex('surveys')
      .select('surveys.id', 'surveys.created_at', 'surveys.name')
      .join('users', 'surveys.user_id', 'users.id')
      .where('slack_id', req.user.creator_id)
      .andWhere('surveys.id', req.params.id)
      .then((resp) => {
        if (resp.length === 0) {
          res.status(403).send('Unauthorized');
        } else {
          const returnArray = [];
          resp.forEach((response, i) => {
            knex('respondents')
              .select('*')
              .where('survey_id', response.id)
              .then((respondents) => {
                returnArray[i] = {
                  surveyID: response.id,
                  name: response.name,
                  createdAt: response.created_at,
                  respondentCount: respondents.length,
                };
                if (returnArray.length === resp.length) {
                  res.status(200).json(returnArray);
                }
              })
              .catch((err) => {
                res.status(500).json(err);
              });
          });
        }

      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  router.get('/user/surveys/:id/questions', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    knex('surveys')
      .select('surveys.id', 'surveys.created_at', 'surveys.name')
      .join('users', 'surveys.user_id', 'users.id')
      .where('slack_id', req.user.creator_id)
      .andWhere('surveys.id', req.params.id)
      .then((resp) => {
        if (resp.length >= 1) {
          knex('questions')
            .select('*')
            .where('survey_id', req.params.id)
            .then((resp) => {
              res.status(200).json(resp);
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        } else {
          res.status(403).send('Unauthorized');
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  router.get('/user/surveys/:id/questions/:qid', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    knex('surveys')
      .select('surveys.id', 'surveys.created_at', 'surveys.name')
      .join('users', 'surveys.user_id', 'users.id')
      .where('slack_id', req.user.creator_id)
      .andWhere('surveys.id', req.params.id)
      .then((resp) => {
        if (resp.length >= 1) {
          knex('questions')
            .select('*')
            .where('survey_id', req.params.id)
            .andWhere('id', req.params.qid)
            .then((resp) => {
              res.status(200).json(resp);
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        } else {
          res.status(403).send('Unauthorized');
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  router.get('/user/surveys/:id/responses', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {

    knex('surveys')
      .select('surveys.id', 'surveys.created_at', 'surveys.name')
      .join('users', 'surveys.user_id', 'users.id')
      .where('slack_id', req.user.creator_id)
      .andWhere('surveys.id', req.params.id)
      .then((resp) => {
        if (resp.length >= 1) {
          const getQualitativeAnswers = () => {
            return knex('qualitative_answers')
              .leftJoin('questions', 'qualitative_answers.question_id', 'questions.id')
              .leftJoin('respondents', 'qualitative_answers.respondent_id', 'respondents.id')
              .where('questions.survey_id', req.params.id)
              .then((data) => {
                return data;
              });
          }
          const getQuantitativeAnswers = () => {
            return knex('quantiative_answers')
              .leftJoin('questions', 'quantiative_answers.question_id', 'questions.id')
              .leftJoin('respondents', 'quantiative_answers.respondent_id', 'respondents.id')
              .where('questions.survey_id', req.params.id)
              .then((data) => {
                return data;
              });
          }

          Promise.all([getQualitativeAnswers(), getQuantitativeAnswers()])
            .then((values) => {
              if (values[0].length === 0 && values[1].length === 0) {
                res.status(403).send('Unauthorized');
              } else {
                const answerObject = {}
                values[0].forEach((answer) => {
                  if (!answerObject[answer.question_id]) {
                    answerObject[answer.question_id] = [];
                  }
                  answerObject[answer.question_id].push(answer);
                })
                values[1].forEach((answer) => {
                  if (!answerObject[answer.question_id]) {
                    answerObject[answer.question_id] = [];
                  }
                  answerObject[answer.question_id].push(answer);
                })

                res.status(200).json(answerObject);
              }
            })
            .catch((err) => {
              res.status(500).json(err);
            })
        } else {
          res.status(403).send('Unauthorized');
        }
      })


  });

  router.get('/user/surveys/:id/responses/:questionid', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {

    knex('surveys')
      .select('surveys.id', 'surveys.created_at', 'surveys.name')
      .join('users', 'surveys.user_id', 'users.id')
      .where('slack_id', req.user.creator_id)
      .andWhere('surveys.id', req.params.id)
      .then((resp) => {
        if (resp.length >= 1) {
          const getQualitativeAnswers = () => {
            return knex('qualitative_answers')
              .leftJoin('questions', 'qualitative_answers.question_id', 'questions.id')
              .leftJoin('respondents', 'qualitative_answers.respondent_id', 'respondents.id')
              .where('questions.id', req.params.questionid)
              .then((data) => {
                return data;
              });
          }

          const getQuantitativeAnswers = () => {
            return knex('quantiative_answers')
              .leftJoin('questions', 'quantiative_answers.question_id', 'questions.id')
              .leftJoin('respondents', 'quantiative_answers.respondent_id', 'respondents.id')
              .where('questions.id', req.params.questionid)
              .then((data) => {
                return data;
              });
          }

          Promise.all([getQualitativeAnswers(), getQuantitativeAnswers()])
            .then((values) => {
              if (values[0].length === 0 && values[1].length === 0) {
                res.status(403).send('Unauthorized');
              } else {
                const answerObject = {}
                values[0].forEach((answer) => {
                  if (!answerObject[answer.question_id]) {
                    answerObject[answer.question_id] = [];
                  }
                  answerObject[answer.question_id].push(answer);
                })
                values[1].forEach((answer) => {
                  if (!answerObject[answer.question_id]) {
                    answerObject[answer.question_id] = [];
                  }
                  answerObject[answer.question_id].push(answer);
                })

                res.status(200).json(answerObject);
              }
            })
            .catch((err) => {
              res.status(500).json(err);
            })
        } else {
          res.status(403).send('Unauthorized');
        }
      })
  });

  router.get('*', (req, res) => {
    res.status(404).send('Not Found');
  })

  return router;
};
