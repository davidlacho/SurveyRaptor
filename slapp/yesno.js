module.exports = (slapp) => {
  const questions = [{
    question: 'first question',
    possibleAnswers: ['A', 'B', 'C', 'D'],
  },
  {
    question: 'Who is the coolest?',
    possibleAnswers: ['David', 'Jess', 'Andy', 'Jack'],
  },
];

  const createMessage = (question, i) => {
    const questionObject = {
      text: question.question,
      attachments: [{
        text: '',
        fallback: 'Yes or No?',
        callback_id: `yesno_callback/${i}`,
        actions: [],
      }],
    };

    const actions = [];
    question.possibleAnswers.forEach((possibleAnswer) => {
      actions.push({
        name: 'answer',
        text: possibleAnswer,
        type: 'button',
        value: possibleAnswer,
      });
    });

    questionObject.attachments[0].actions = actions;
    return questionObject;
  };

  const sendMessage = (arrayIndex, message) => {
    slapp.message(`yesno${arrayIndex}`, (msg) => {
      msg.say(message);
    });
  }


  const messageArray = questions.map((question, i) => createMessage(question, i));

  slapp.action(`yesno_callback/:arrayIndex`, 'answer', (msg, value) => {
    const currentarrayIndex = Number(msg.body.callback_id.split('/')[1]);
    if (messageArray[currentarrayIndex + 1]) {
      msg.respond(msg.body.response_url, messageArray[currentarrayIndex + 1]);
    } else {
      msg.respond(msg.body.response_url, "That's all! Thanks!");
    }
  });

  sendMessage(0, messageArray[0]);

  return slapp;
};
