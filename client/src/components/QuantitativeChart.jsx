import React, { Component } from 'react';

// Echarts
import ReactEcharts from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';

class QuantitativeChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantitativeData:
      {
        "responses":
        [
          {
            "id":45,
            "respondent_id":45,
            "quantiative_possible_answers_id":261,
            "answer":"A",
            "question_id":472,
            "tone":"{\"tones\":[]}",
            "survey_id":281,
            "question_type":"quantitative",
            "question":"hey there",
            "created_at":null,
            "updated_at":null,
            "slack_id":"UEW656J4A",
            "name":"david.lacho",

          },
          {
            "id":46,
            "respondent_id":46,
            "quantiative_possible_answers_id":262,
            "answer":"B",
            "question_id":472,
            "tone":"{\"tones\":[]}",
            "survey_id":281,
            "question_type":"quantitative",
            "question":"hey there",
            "created_at":null,
            "updated_at":null,
            "slack_id":"UEW6B4CJE",
            "name":"jskawinters",
          },
          {
            "id":46,
            "respondent_id":46,
            "quantiative_possible_answers_id":262,
            "answer":"B",
            "question_id":472,
            "tone":"{\"tones\":[]}",
            "survey_id":281,
            "question_type":"quantitative",
            "question":"hey there",
            "created_at":null,
            "updated_at":null,
            "slack_id":"UEW6B4CJE",
            "name":"jskawinters",
          },
        ],
        "possible_answers":
        [
          "A",
          "B",
          "C",
        ],
      },
    };

    this.getOption = this.getOption.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
  }

  getAnswers() {
    const possibleAnswers = this.state.quantitativeData.possible_answers;
    const responses = this.state.quantitativeData.responses;
    let countAnswers = {};

    possibleAnswers.forEach((answer) =>{
      countAnswers[answer] = 0;
    });

    responses.forEach((response) => {
      countAnswers[response.answer]++;
    });

    const x = [];
    const y = [];

    Object.keys(countAnswers).forEach((key) => {
      x.push(key);
      y.push(countAnswers[key]);
    });

    return {x, y};
  }

  componentDidMount() {
    console.log(this.getAnswers());
  }

  getOption() {
    const axis = this.getAnswers();
    const option = {
      xAxis: {
        type: 'category',
        data: axis.x,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: axis.y,
          type: 'bar',
        },
      ],
    };

    return option;
  }

  render() {
    return (
      <ReactEcharts
        echarts={echarts}
        option={this.getOption()}
        notMerge={true}
        lazyUpdate={true}
        theme={'light'}
        onChartReady={this.onChartReadyCallback}
      />
    );
  }
}

export default QuantitativeChart;
