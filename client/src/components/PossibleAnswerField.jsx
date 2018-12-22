import React, {
  Component
} from 'react';

// TODO: Remove after getting cookie
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

class PossibleAnswerField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  updateValue = (evt) => {
    this.setState({
      value: evt.target.value,
    })
    this.props.updatePossibleAnswers(this.props.number, evt.target.value)
    this.props.saveAnswer(this.props.questionKey, this.props.number, evt.target.value)
  }

  render() {
    return (
      <fragment>
        <label htmlFor={`question-${this.props.questionKey + 1}-option-${this.props.number + 1}`}>Option {this.props.number +1}:</label>
        <input className={`question-option question-option-${this.props.number + 1}`} onKeyUp={this.updateValue} name={`question-${this.props.questionKey + 1}-option-${this.props.number + 1}`}/>
      </fragment>
    );
  }
}

export default PossibleAnswerField;
