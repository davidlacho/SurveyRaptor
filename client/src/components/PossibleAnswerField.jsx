import React, { Component } from 'react';

// Material-UI Components
import TextField from '@material-ui/core/TextField';

// TODO: Remove after getting cookie
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

class PossibleAnswerField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  updateValue = (event) => {
    this.setState({
      value: event.target.value,
    });

    this.props.updatePossibleAnswers(this.props.number, event.target.value);
    this.props.saveAnswer(this.props.questionKey, this.props.number, event.target.value);
  }

  render() {
    return (
      <React.Fragment>
        <TextField name={`question-${this.props.questionKey + 1}-option-${this.props.number + 1}`} label={`Option ${this.props.number +1}`} className={`form-field question-option-${this.props.number + 1}`} variant="outlined" margin="dense" onKeyUp={this.updateValue} />
      </React.Fragment>
    );
  }
}

export default PossibleAnswerField;
