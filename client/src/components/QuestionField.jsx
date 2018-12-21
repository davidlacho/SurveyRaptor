import React, {
  Component
} from 'react';
// import $ from 'jquery';
import PossibleAnswerField from './PossibleAnswerField';

// TODO: Remove after getting cookie
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

class QuestionField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerKey: 0,
    }
    const addAnAnswerToQuestion = this.addAnAnswerToQuestion.bind(this);
  }

  addAnAnswerToQuestion = (event) => {
    this.setState({
      answerKey : this.state.answerKey + 1,
    });
    console.log(this.state.answerKey);
  };


  render() {
    const answerChildren = [];
    for (var i = 0; i < this.state.answerKey; i += 1) {
      answerChildren.push(<PossibleAnswerField key={i} number={i} />);
    };
    return (
      <div>
      <p>A question!</p>
      {answerChildren}
      <button type="button" onClick={()=>this.addAnAnswerToQuestion()}>Add An Option</button>
      </div>
    );
  }

}

export default QuestionField;
