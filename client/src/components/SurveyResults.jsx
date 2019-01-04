import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import QualitativeChart from './QualitativeChart';
import QuantitativeChart from './QuantitativeChart';

class SurveyResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      surveyResponses: {},
    };
  }

  componentDidMount() {
    const {id} = this.props.match.params;

    axios.get(`/api/user/surveys/${id}/responses`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie.load('jwt')}`
      }
    })
    .then(res => {
      const answers = {};

      for (let key in res.data) {
        answers[key] = {};
        answers[key].responses = res.data[key].responses;

        if (res.data[key].responses[0].question_type === 'quantitative') {
          axios.get(`/api/user/surveys/${id}/questions/${key}`, {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${cookie.load('jwt')}`
            }
          })
          .then((response) => {
            answers[key].possible_answers = response.data[key].possible_answers;
          });
        }
      }

      this.setState({
        surveyResponses: answers,
      });
    })
    .catch((err) => {
      console.error(`There was an error retrieving survey responses: ${err}`)
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
