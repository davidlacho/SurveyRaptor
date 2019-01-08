import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { convertToPercentage } from './utils/helper';

class ResultsBigFiveFacet extends Component {
  constructor(props) {
    super(props);

    this.getOption = this.getOption.bind(this);
  }

  getOption() {
    const option = {
      tooltip: {},
      scale: false,
      radar: {
        name: {
          textStyle: {
            color: '#fff',
            fontFamily: 'CircularStd-Book',
            fontSize: 13
          }
        },
        indicator: [
          {
            name: this.props.resultData[0]["name"],
            max: 100
          },
          { name: this.props.resultData[1]["name"], max: 100 },
          { name: this.props.resultData[2]["name"], max: 100 },
          { name: this.props.resultData[3]["name"], max: 100 },
          { name: this.props.resultData[4]["name"], max: 100 },
          { name: this.props.resultData[5]["name"], max: 100 }
        ]
      },
      series: [
        {
          name: this.props.chartTitle,
          type: "radar",
          symbolSize: "7",
          areaStyle: {
            normal: {
              opacity: 0.3
            }
          },
          data: [
            {
              value: [
                convertToPercentage(this.props.resultData[0]["percentile"]),
                convertToPercentage(this.props.resultData[1]["percentile"]),
                convertToPercentage(this.props.resultData[2]["percentile"]),
                convertToPercentage(this.props.resultData[3]["percentile"]),
                convertToPercentage(this.props.resultData[4]["percentile"]),
                convertToPercentage(this.props.resultData[5]["percentile"])
              ]
            }
          ]
        }
      ]
    };

    return option;
  }
  render() {
    return (
      <div>
        <ReactEcharts
          option={this.getOption()}
          style={{ width: "100%", height: 400 }}
          className="react_for_echarts"
        />
      </div>
    );
  }
}

export default ResultsBigFiveFacet;
