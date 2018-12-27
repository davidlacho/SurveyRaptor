import React, {
  Component
} from 'react';
if (process.env.NODE_ENV !== 'production') require('dotenv').config();


const userArray = [{
  id: 'UEX8JPUKD',
  team_id: 'TEWPA9ZMX',
  name: 'david.lacho',
  deleted: false,
  color: '9f69e7',
  real_name: 'david.lacho',
  tz: 'America/Los_Angeles',
  tz_label: 'Pacific Standard Time',
  tz_offset: -28800,
  profile: {
    title: '',
    phone: '',
    skype: '',
    real_name: 'david.lacho',
    real_name_normalized: 'david.lacho',
    display_name: '',
    display_name_normalized: '',
    status_text: '',
    status_emoji: '',
    status_expiration: 0,
    avatar_hash: 'g097d1869a48',
    email: 'david.lacho@gmail.com',
    image_24: 'https://secure.gravatar.com/avatar/097d1869a48415dd44765ea37c91c79a.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
    image_32: 'https://secure.gravatar.com/avatar/097d1869a48415dd44765ea37c91c79a.jpg?s=32&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-32.png',
    image_48: 'https://secure.gravatar.com/avatar/097d1869a48415dd44765ea37c91c79a.jpg?s=48&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-48.png',
    image_72: 'https://secure.gravatar.com/avatar/097d1869a48415dd44765ea37c91c79a.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2F3654%2Fimg%2Favatars%2Fava_0011-72.png',
    image_192: 'https://secure.gravatar.com/avatar/097d1869a48415dd44765ea37c91c79a.jpg?s=192&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-192.png',
    image_512: 'https://secure.gravatar.com/avatar/097d1869a48415dd44765ea37c91c79a.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
    status_text_canonical: '',
    team: 'TEWPA9ZMX'
  },
  is_admin: true,
  is_owner: true,
  is_primary_owner: true,
  is_restricted: false,
  is_ultra_restricted: false,
  is_bot: false,
  is_app_user: false,
  updated: 1545444633
}]

class DeploymentOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const selectableUsers = userArray.map((user) => {
      return (
        <div className="selectable-user" >
          <img src={user.profile.image_32} alt='User Avatar' />
          {user.name}
        </div>
      )
    });

    return (
      <React.Fragment>
        {selectableUsers}
      </React.Fragment>
    );
  }
}

export default DeploymentOptions;
