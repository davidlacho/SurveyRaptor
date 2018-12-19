if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const SlackBot = require('slackbots');

// create a bot
const bot = new SlackBot({
  token: 'xoxb-506040867636-506523827280-sWIdZSlrAGnTTgIlIFU6v5cY', // Add a bot https://my.slack.com/services/new/bot and put the token
  name: 'Survey Raptor',
});

bot.getUsers()
  .then((users) => {
    users.members.forEach((user) => {
      console.log(user);
      bot.postMessageToUser(user.real_name, 'meow!', { icon_emoji: ':cat:' });
    });
  });

// bot.getChannels()
//   .then((response) => {
//     response.channels.forEach((channel) => {
//       channel.members.forEach((member) => {
//         bot.getUserById(member)
//           .then((memberRecord) => {
//             console.log(`${memberRecord.real_name} is a member of ${channel.name}`);
//             console.log(memberRecord);
//           });
//       });
//     });
//   });

bot.on('start', () => {
  const params = {
    icon_emoji: ':question:',
  };
});

bot.on('message', (data) => {
  // more information about additional params https://api.slack.com/methods/chat.postMessage
  if (data.type === 'message' && !data.bot_id) {
    console.log(data);
  }
});
