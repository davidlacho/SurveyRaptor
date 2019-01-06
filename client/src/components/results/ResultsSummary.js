import React, { Component } from 'react';
import PersonalityTextSummaries from 'personality-text-summary';

class ResultsSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summary: '',
    };
  }

  componentWillMount() {
    let v3EnglishTextSummaries = new PersonalityTextSummaries({
      version: 'v3'
    });

    let textSummary = v3EnglishTextSummaries.getSummary(this.props.resultData);

    this.setState({
      summary: textSummary
    });
  }

  render() {
    return (
      <div className="results-container">
        <div className="results-summary">
          <h1 className="text-center">Result Summary</h1>
          <p className="lead summary-text">{this.state.summary}</p>
        </div>
      </div>
    );
  }
}

export default ResultsSummary;
