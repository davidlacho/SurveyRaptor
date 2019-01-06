import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

// Chart components
import QualitativeChart from '../charts/QualitativeChart';
import QuantitativeChart from '../charts/QuantitativeChart';

class SurveyResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        this.setState({
          surveyResponses: answers,
        });
        if (res.data[key].responses[0].question_type === 'quantitative') {
          axios.get(`/api/user/surveys/${id}/questions/${key}`, {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${cookie.load('jwt')}`
            }
          })
          .then((response) => {
            const newState = this.state.surveyResponses;
            newState[key].possible_answers = response.data[key].possible_answers;
            this.setState({
              surveyResponses: newState,
            });
          });
        }
      }
    })
    .catch((err) => {
      if (err.response.status === 404) {
        this.setState({
          noResponses: true
        });
      }
      console.error(`There was an error retrieving survey responses: ${err}`)
    });
  }

  render() {
    const resultCharts = this.state.surveyResponses ?
    Object.keys(this.state.surveyResponses).map((key) => {
      if(this.state.surveyResponses[key].responses[0].question_type === 'quantitative' && this.state.surveyResponses[key].possible_answers) {
        const dataObject = this.state.surveyResponses[key];
        return (<React.Fragment><h2 className="survey-response--question">{dataObject.responses[0].question}</h2><QuantitativeChart quantitativeData={dataObject} key={this.state.surveyResponses[key].responses.id} /></React.Fragment>);
      }

      if(this.state.surveyResponses[key].responses[0].question_type === 'qualitative') {
        const dataObject = this.state.surveyResponses[key];
        return (<React.Fragment><h2 className="survey-response--question">{dataObject.responses[0].question}</h2><QualitativeChart data={dataObject} key={this.state.surveyResponses[key].responses.id} /></React.Fragment>);
      }
      return '';
    })
    :
    this.state.noResponses ? 'There are no responses' : null;

    return (
      <div className="site-content">
        <h1>SurveyResults</h1>
        {resultCharts}
      </div>
    );
  }

}

export default SurveyResults;
