module.exports = (slapp) => {
  const ids = [1, 2, 3, 4, 5, 6];

  const createMessage = (id) => {
    return ({
      text: `THIS IS QUESTION ${id}`,
      attachments: [{
        text: '',
        fallback: 'Yes or No?',
        callback_id: `yesno_callback/${id}`,
        actions: [{
            name: 'answer',
            text: 'yes',
            type: 'button',
            value: 'A',
          },
          {
            name: 'answer',
            text: 'no',
            type: 'button',
            value: 'B',
          },
        ],
      }],
    });
  };

  const sendMessage = (id, message) => {
    slapp.message(`yesno${id}`, (msg) => {
      msg.say(message);
    });
  }


  const messageArray = ids.map(id => createMessage(id));


  slapp.action(`yesno_callback/:id`, 'answer', (msg, value) => {
    const currentID = Number(msg.body.callback_id.split('/')[1]);
    if (messageArray[ids.indexOf(currentID) + 1]) {
      msg.respond(msg.body.response_url, messageArray[ids.indexOf(currentID) + 1]);
    } else {
      msg.respond(msg.body.response_url, "That's all! Thanks!");
    }
  });

  sendMessage(1, messageArray[0]);

  return slapp;
};
