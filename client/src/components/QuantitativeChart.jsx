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
      quantitativeData: {},
    };

    this.getOption = this.getOption.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
  }

  getAnswers() {
    const possibleAnswers = this.props.quantitativeData.possible_answers;
    const responses = this.props.quantitativeData.responses;
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
