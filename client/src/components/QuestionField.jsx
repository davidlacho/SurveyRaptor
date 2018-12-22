import React, {
  Component
} from 'react';
import PossibleAnswerField from './PossibleAnswerField';

// TODO: Remove after getting cookie
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

class QuestionField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerKey: 0,
      value: '',
      possibleAnswers: ['', '', '', ''],
    }
    const addAnAnswerToQuestion = this.addAnAnswerToQuestion.bind(this);
    const updatePossibleAnswers = this.updatePossibleAnswers.bind(this);
  }

  addAnAnswerToQuestion = (event) => {
    this.setState({
      answerKey : this.state.answerKey + 1,
    });
  };

  updateValue = (evt) => {
    this.setState({
      value: evt.target.value,
    })
    this.props.saveQuestion(this.props.number, evt.target.value)
  }

  updatePossibleAnswers = (possibleAnswerKey, value) => {
    const possibleAnswers = this.state.possibleAnswers;
    possibleAnswers[possibleAnswerKey] = value;
    this.setState({
      possibleAnswers : possibleAnswers,
    });
  }

  render() {
    const answerChildren = [];
    for (var i = 0; i < this.state.answerKey; i += 1) {
      answerChildren.push(<PossibleAnswerField key={i} number={i} saveAnswer={this.props.saveAnswer} questionKey={this.props.number} updatePossibleAnswers={this.updatePossibleAnswers}/>);
    };

    const answerButton = !!this.state.value && this.state.answerKey <=3 && (!this.state.answerKey - 1  === 0 || !!this.state.possibleAnswers[this.state.answerKey -1]) ? <button type="button" onClick={()=>this.addAnAnswerToQuestion()}>Add An Option</button> : undefined;
    return (
      <div>
      <label htmlFor={`question-${this.props.number + 1}`}>Question {this.props.number + 1}:</label>
      <input className={`question question-${this.props.number + 1}`} name={`question-${this.props.number + 1}`} onKeyUp={this.updateValue}/>
      {answerChildren}
      {answerButton}
      </div>
    );
  }

}

export default QuestionField;
