import React, {
  Component
} from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import cookie from 'react-cookies';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import {
  NavLink
} from 'react-router-dom';

class QualitativeChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      team: {}
    }
  }

  componentDidMount() {
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
        })
      })
  }

  render() {
    const responseCards = (this.state.team ?
      this.state.data.responses.map((response, i) => {
        const tone = JSON.parse(response.tone).tones[0];
        return(
          <div key={response.id}>
            <h2>{response.question}</h2>
            <Paper className='' elevation={1}>
            <NavLink to={`/values/${response.slack_id}`}>
              <div>
                <Avatar alt={`${response.name}'s Avatar`} src={this.state.team[response.slack_id].profile.image_72} className='' />
                <h3>{response.name}</h3>
              </div>
            </NavLink>
            <div>
              <Typography variant="h5" component="h3">
                {response.answer}
              </Typography>
              <Typography component="p">
                <Chip label={`${tone.tone_name}: ${(tone.score * 100).toFixed(2)}%`} className='' variant="outlined" />
              </Typography>
              </div>
            </Paper>
          </div>
        )
        })
      : '');


    return (
      <div> {responseCards} </div>
    );
  }

}
export default QualitativeChart;
