import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

// Material-UI Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

class QualitativeChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    }
  }

  componentDidMount() {
    const team = sessionStorage.getItem('team');
    if (team) {
      this.setState({
        team: JSON.parse(team),
      });
    } else {
      axios.get(`/api/team/`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.load('jwt')}`
        }
      })
      .then((results) => {
        const teamObject = {}
        results.data.forEach((res) => {
          teamObject[res.id] = res;
        })
        this.setState({
          team: teamObject,
        });
        sessionStorage.setItem('team', JSON.stringify(teamObject));
      });
    }
  }

  render() {
    const responseCards = (this.state.team ?
      this.props.data.responses.map((response, i) => {
        const tone = JSON.parse(response.tone);
        const toneChips = tone && tone.tones[0] ? <div key={response.id}><Typography component="p"><Chip label={`${tone.tones[0].tone_name}: ${(tone.tones[0].score * 100).toFixed(2)}%`} variant="outlined" /></Typography></div> : null;

    const userAvatar = (this.state.team[response.slack_id] ?
      <React.Fragment>
        <Avatar alt={`${response.name}'s Avatar`} src={this.state.team[response.slack_id].profile.image_72} />
        <h3>{response.name}</h3>
      </React.Fragment>
    :
      <React.Fragment>
        <h3>{response.name}</h3>
      </React.Fragment>
    );

        return(
          <div key={response.id}>
            <h2>{response.question}</h2>
            <Paper elevation={1}>
              <NavLink to={`/values/${response.slack_id}`}>
                <div>
                  {userAvatar}
                </div>
              </NavLink>
              <div>
                <Typography variant="h5" component="h3">
                  {response.answer}
                </Typography>
                  {toneChips}
              </div>
            </Paper>
          </div>
        )
      }
    ): '');

    return (
      <React.Fragment>
        {responseCards}
      </React.Fragment>
    );
  }
}

export default QualitativeChart;
