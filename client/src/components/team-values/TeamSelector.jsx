import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { NavLink } from 'react-router-dom';

// Material-UI Components
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

class TeamSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team: [],
    };
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
    });
  }

  render() {
    const team = this.state.team;
    const selectableUsers = team.map((user) => {
      if (user.name === 'slackbot' || user.name === 'survey_raptor') {
        return false;
      }

      if (user.deleted) {
        return false;
      }

      return (
        <NavLink to={`/values/${user.id}`} key={user.id}>
          <Card className="selectable-users--card">
            <CardActionArea>
              <CardMedia
                component="img"
                alt={user.name}
                image={user.profile.image_512}
                title={user.name}
              />
              <CardContent>
                <h2 className="selectable-users--name">{user.name}</h2>
              </CardContent>
            </CardActionArea>
          </Card>
        </NavLink>
      )
    });

    return (
      <div className="selectable-users">
        {selectableUsers}
      </div>
    );
  }

}

export default TeamSelector;
