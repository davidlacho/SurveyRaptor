const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const toneAnalyzer = new ToneAnalyzerV3({
  iam_apikey: process.env.TONE_API_KEY,
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
  version: '2019-01-01',
});

module.exports = (text, callback) => {
  toneAnalyzer.tone({
    tone_input: text,
    content_type: 'text/plain',
  },
  (err, tone) => {
    if (err) {
      callback (err);
    }
    callback (null, tone);
  });
};
