import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

// Material-UI Components
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

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
        const toneChips = tone && tone.tones[0] ? <Chip key={response.id} label={`${tone.tones[0].tone_name}: ${(tone.tones[0].score * 100).toFixed(2)}%`} variant="outlined" /> : null;

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
          <div key={response.id} className="survey-response--container">
            <Paper elevation={1} className="survey-response--wrapper">
              <NavLink to={`/values/${response.slack_id}`} className="survey-response--results-link">
                {userAvatar}
              </NavLink>
              <div className="survey-response--answer">
                <span>
                  {response.answer}
                </span>
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
