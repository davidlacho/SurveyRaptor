import React, {
  Component
} from 'react';
// import $ from 'jquery';

// TODO: Remove after getting cookie
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

class PossibleAnswerField extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <p>A Possible Answer!</p>

    );
  }

}

export default PossibleAnswerField;
