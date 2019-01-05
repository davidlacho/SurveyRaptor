const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const wordcount = require('wordcount');

const personalityInsights = new PersonalityInsightsV3({
  iam_apikey: process.env.PERSONALITY_API_KEY,
  version: '2019-01-01',
  url: 'https://gateway.watsonplatform.net/personality-insights/api/',
});


module.exports = (knex, slackID, callback) => {
  const getQualitativeAnswers = () => knex('qualitative_answers')
    .select('answer')
    .join('respondents', 'qualitative_answers.respondent_id', 'respondents.id')
    .where('slack_id', '=', slackID)
    .then(data => data);

  const getQuantitativeAnswers = () => knex('quantiative_answers')
    .select('answer')
    .join('respondents', 'quantiative_answers.respondent_id', 'respondents.id')
    .where('slack_id', '=', slackID)
    .then(data => data);

  Promise.all([getQualitativeAnswers(), getQuantitativeAnswers()])
    .then((values) => {
      const userAnswers = [];
      values[0].forEach((answer) => {
        userAnswers.push(answer.answer);
      });
      values[1].forEach((answer) => {
        userAnswers.push(answer.answer);
      });
      let userString = userAnswers.join('. ');
      while (wordcount(userString) < 100) {
        userString += userString;
      }
      return userString;
    })
    .then((answerString) => {
      personalityInsights.profile(
        {
          content: answerString,
          content_type: 'text/plain',
          consumption_preferences: true,
        },
        function(err, response) {
          if (err) {
            callback(err);
          } else {
            callback(null, response);
          }
        }
      );
    })
    .catch((err) => {
      callback(err);
    });
};
