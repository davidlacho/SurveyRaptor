import React, {
  Component
} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/AddCircleOutline';

if (process.env.NODE_ENV !== 'production') require('dotenv').config();


class DeploymentOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: [],
      selectedUsers: [],
    };
  }

  handleClick(name) {
    const selectedUsers = this.state.selectedUsers;
    const indexOfName = selectedUsers.indexOf(name);
    if (indexOfName === -1) {
      selectedUsers.push(name);
      this.setState({
        selectedUsers : selectedUsers,
      })
    } else {
      selectedUsers.splice(indexOfName, 1);
      this.setState({
        selectedUsers : selectedUsers,
      })
    }
  }


  componentDidMount() {
    axios.get('/api/team', {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.load('jwt')}`
        }
      })
      .then(res => {
        this.setState({
          team: res.data,
        });
      })
      .catch((err) => {
        console.error('There was an error retrieving team.')
      })
  }


  render() {
    const team = this.state.team;
    const selectableUsers = team.map((user) => {
      console.log(user.profile);
      if (user.deleted) {
        return
      }

      const deleteIcon = this.state.selectedUsers.includes(user.name) ? null : <DoneIcon />;

      const variantFill = this.state.selectedUsers.includes(user.name) ? null : "outlined"

      return (
        <Chip
          key={user.id}
          avatar={<Avatar alt={user.name} src={user.profile.image_192} />}
          label={user.name}
          color="primary"
          variant={variantFill}
          onClick={()=> this.handleClick(user.name)}
          onDelete={() => this.handleClick(user.name)}
          deleteIcon={deleteIcon}
        />
        )
      });
    return(
      <div>{selectableUsers}</div>
    );
  }


}

export default DeploymentOptions;
