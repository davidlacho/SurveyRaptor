import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import QualitativeChart from './QualitativeChart';
import QuantitativeChart from './QuantitativeChart';

class SurveyResults extends Component {
  constructor(props) {
    super(props);

    this.state = {

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
      console.error(`There was an error retrieving survey responses: ${err}`)
    });
  }

  render() {
    const resultCharts = this.state.surveyResponses ?
    Object.keys(this.state.surveyResponses).map((key) => {
      if(this.state.surveyResponses[key].responses[0].question_type === 'quantitative' && this.state.surveyResponses[key].possible_answers) {
        console.log('this worked. render quantitative chart');
        const dataObject = this.state.surveyResponses[key];
        return <QuantitativeChart quantitativeData={dataObject} key={this.state.surveyResponses[key].responses.id} />;
      }

      if(this.state.surveyResponses[key].responses[0].question_type === 'qualitative') {
        const dataObject = this.state.surveyResponses[key];
        return <QualitativeChart data={dataObject} key={this.state.surveyResponses[key].responses.id} />;
      }

      return '';
    })
    :
    '';

    return (
      <div className="site-content">
        <h2>SurveyResults</h2>
        {resultCharts}
      </div>
    );
  }
}

export default SurveyResults;
