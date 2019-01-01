import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

class SurveyResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      surveys: [],
    };
  }

  componentDidMount() {
    axios.get('/api/user/surveys/:id', {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie.load('jwt')}`
      }
    })
    .then(res => {
      this.setState({
        surveys: res.data,
      });
      console.log(this.state.surveys.history.location.pathname);
    })
    .catch((err) => {
      console.error(`There was an error retrieving surveys: ${err}`)
    });
  }

  render() {
    return (
      <div className="site-content">
        <h2>SurveyResults</h2>
      </div>
    );
  }
}

export default SurveyResults;
