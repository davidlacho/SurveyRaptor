if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const SlackBot = require('slackbots');

// create a bot
const bot = new SlackBot({
  token: process.env.SLACK_BOT_OAUTH_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
  name: 'Survey Raptor',
});

bot.getUsers()
  .then((users) => {
    users.members.forEach((user) => {
      console.log(user.profile.real_name, user.profile.image_512);
    });
  });


bot.on('start', () => {
  // more information about additional params https://api.slack.com/methods/chat.postMessage
  const params = {
    icon_emoji: ':question:',
  };
});

bot.on('message', (data) => {
  // more information about additional params https://api.slack.com/methods/chat.postMessage
  if (data.type === 'message' && !data.bot_id) {
    console.log(`  ${data.user} says: ${data.text}.`);
  }
});
