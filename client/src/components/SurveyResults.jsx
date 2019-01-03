import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

import ReactEcharts from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';

class SurveyResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      surveyResponses: {},
      surveyQuestions: [],
    };

    this.getOption = this.getOption.bind(this);
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
      console.log(res.data);
      this.setState({
        surveyResponses: res.data,
      });
    })
    .catch((err) => {
      console.error(`There was an error retrieving survey responses: ${err}`)
    });

    axios.get(`/api/user/surveys/${id}/questions`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie.load('jwt')}`
      }
    })
    .then(res => {
      this.setState({
        surveyQuestions: res.data,
      });
    })
    .catch((err) => {
      console.error(`There was an error retrieving survey questions: ${err}`)
    });
  }

  getOption() {
    const option = {
      xAxis: {
        type: 'category',
        data: [
          'A',
          'B',
          'C',
          'D',
        ]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [
            120,
            250,
            150,
            80,
          ],
          type: 'bar'
        }
      ]
    };

    return option;
  }

  render() {
    console.log('this.state.surveyQuestions', this.state.surveyQuestions);
    console.log('this.state.surveyResponses', this.state.surveyResponses);

    this.state.surveyQuestions.forEach((question) => {
      if (question.question_type === 'quantitative') {
        axios.get(`/api/user/surveys/${question.survey_id}/questions/${question.id}`, {}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie.load('jwt')}`
          }
        })
        .then(res => {
          const answerArr = []
          res.data.forEach((possibleAnswer) => {
            answerArr.push(possibleAnswer.possible_answers);
          });
          console.log('!!!', answerArr)
        })
        .catch((err) => {
          console.error(`There was an error retrieving survey questions: ${err}`)
        });
      }
    });

    return (
      <div className="site-content">
        <h2>SurveyResults</h2>

        <ReactEcharts
          echarts={echarts}
          option={this.getOption()}
          notMerge={true}
          lazyUpdate={true}
          theme={'light'}
          onChartReady={this.onChartReadyCallback}
        />
      </div>
    );
  }
}

export default SurveyResults;
