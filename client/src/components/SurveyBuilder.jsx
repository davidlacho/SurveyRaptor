import React, { Component } from 'react';

// App components
import Questions from './Questions';
import SurveyForm from './SurveyForm'
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
