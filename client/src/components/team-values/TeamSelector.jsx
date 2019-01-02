import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import cookie from 'react-cookies';
import { NavLink } from 'react-router-dom';


const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'cover',
  },
};

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
      })
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
          <Card className={this.props.classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={user.name}
                className={this.props.classes.media}
                height="250"
                image={user.profile.image_512}
                title={user.name}
              />
              <CardContent>
                <Typography>
                  <h2>{user.name}</h2>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </NavLink>
      )
    });



    return (
      <div className="selectable-users"> {selectableUsers} </div>
    );
  }

}

TeamSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeamSelector);
