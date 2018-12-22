module.exports = (slapp) => {

  slapp.message('yesno', (msg) => {
    msg.say({
      text: '',
      attachments: [{
        text: '',
        fallback: 'Yes or No?',
        callback_id: 'yesno_callback',
        actions: [{
          name: 'answer',
          text: 'Yes',
          type: 'button',
          value: 'yes'
        },
        {
          name: 'answer',
          text: 'No',
          type: 'button',
          value: 'no'
        }
        ]
      }]
    })
  })

  slapp.action('yesno_callback', 'answer', (msg, value) => {
    msg.respond(msg.body.response_url, `${value} is a good choice!`)
  })

  return slapp;
};
