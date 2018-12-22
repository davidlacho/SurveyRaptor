import React, { Component } from 'react';
import SurveyForm from './SurveyForm';

class SurveyBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <SurveyForm />
      </div>
    );
  }
}

export default SurveyBuilder;
