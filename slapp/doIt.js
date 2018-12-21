module.exports = (slapp) => {
  // if a user says "do it" in a DM
  slapp.message('do it', 'direct_message', (msg) => {
    var state = {
      requested: Date.now()
    }
    // respond with an interactive message with buttons Yes and No
    msg
      .say({
        text: '',
        attachments: [{
          text: 'Are you sure?',
          fallback: 'Are you sure?',
          callback_id: 'doit_cohernfirm_callback',
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
      // handle the response with this route passing state
      // and expiring the conversation after 60 seconds
      .route('handleDoitConfirmation', state, 60)
  })

  slapp.route('handleDoitConfirmation', (msg, state) => {
    // if they respond with anything other than a button selection,
    // get them back on track
    if (msg.type !== 'action') {
      msg
        .say('Please choose a Yes or No button :wink:')
        // notice we have to declare the next route to handle the response
        // every time. Pass along the state and expire the conversation
        // 60 seconds from now.
        .route('handleDoitConfirmation', state, 60)
      return
    }

    let answer = msg.body.actions[0].value
    if (answer !== 'yes') {
      // the answer was not affirmative
      msg.respond(msg.body.response_url, {
        text: `OK, not doing it. Whew that was close :cold_sweat:`,
        delete_original: true
      })
      // notice we did NOT specify a route because the conversation is over
      return
    }

    // use the state that's been passed through the flow to figure out the
    // elapsed time
    var elapsed = (Date.now() - state.requested) / 1000
    msg.respond(msg.body.response_url, {
      text: `You requested me to do it ${elapsed} seconds ago`,
      delete_original: true
    })

    // simulate doing some work and send a confirmation.
    setTimeout(() => {
      msg.say('I "did it"');
    }, 3000);
  });

  return slapp;
};
