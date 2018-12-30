import React, {
  Component
} from 'react';
import PossibleAnswerField from './PossibleAnswerField';

// Material-UI Components
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

// TODO: Remove after getting cookie
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

class QuestionField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answerKey: 0,
      value: this.props.value || '',
      possibleAnswers: ['', '', '', ''],
    };

    this.addAnAnswerToQuestion = this.addAnAnswerToQuestion.bind(this);
    this.updatePossibleAnswers = this.updatePossibleAnswers.bind(this);
  }

  addAnAnswerToQuestion = (event) => {
    if (this.state.answerKey === 0) {
      this.setState({
        answerKey: this.state.answerKey + 2,
      });
    } else {
      this.setState({
        answerKey: this.state.answerKey + 1,
      });
    }
  };

  updateValue = (event) => {
    this.setState({
      value: event.target.value,
    })

    this.props.saveQuestion(this.props.number, event.target.value);
  }

  updatePossibleAnswers = (possibleAnswerKey, value) => {
    const possibleAnswers = this.state.possibleAnswers;
    possibleAnswers[possibleAnswerKey] = value;

    this.setState({
      possibleAnswers: possibleAnswers,
    });
  }

  render() {
    // const answerHeader = !!this.state.value ? <h3 className="form-header">Possible Answers</h3> : undefined;

    const answerChildren = [];
    for (var i = 0; i < this.state.answerKey; i += 1) {
      answerChildren.push(<PossibleAnswerField key={i} number={i} saveAnswer={this.props.saveAnswer} questionKey={this.props.number} updatePossibleAnswers={this.updatePossibleAnswers} />);
    };

    const answerButton = !!this.state.value && this.state.answerKey <= 3 && (!this.state.answerKey - 1  === 0 || !!this.state.possibleAnswers[this.state.answerKey -1]) ? <IconButton className="form-button--answer" aria-label="Add an option" onClick={() => this.addAnAnswerToQuestion()}><Tooltip title="add an option" aria-label="add an option"><Icon>add_circle</Icon></Tooltip></IconButton> : undefined;

    return (
      <React.Fragment>
        <div className="form-row--full-width">
          <TextField name={`question-${this.props.number + 1}`} label={`Question ${this.props.number + 1}`} className={`form-field question-${this.props.number + 1}`} variant="outlined" margin="dense" onChange={this.updateValue} value={this.state.value}/>
        </div>

        <div className="form-row">
          {answerChildren}
          {answerButton}
        </div>
      </React.Fragment>
    );
  }

}

export default QuestionField;
