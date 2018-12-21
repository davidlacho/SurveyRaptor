import React, { Component } from 'react';

// App components
import Questions from './Questions';

class SurveyBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Questions />
      </div>
    );
  }
}

export default SurveyBuilder;
