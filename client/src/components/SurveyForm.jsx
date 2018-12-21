import React, {
  Component
} from 'react';
// import $ from 'jquery';
import QuestionField from './QuestionField';


// TODO: Remove after getting cookie
if (process.env.NODE_ENV !== 'production') require('dotenv').config();


class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionKey: 0,
      questions: {}
    }
    const saveQuestion = this.saveQuestion.bind(this);
    const saveAnswer = this.saveAnswer.bind(this);
  }

  saveQuestion = (key, question) => {
    const questionObject = this.state.questions;
    questionObject[key] = {question: question}
    this.setState({
      questions: questionObject,
    });
  }

  addAQuestionToSurvey = (event) => {
    this.setState({
      questionKey : this.state.questionKey + 1,
    });
  };

  saveAnswer = (key, answer) => {
    const questionObject = this.state.questions;
    if(!questionObject.questions[key].possibleAnswers) {
      questionObject.questions[key].possibleAnswers = [];
    }
    questionObject.questions[key].possibleAnswers.push(answer);
    this.setState({
      questions: questionObject,
    });
  }

  render() {
    const questionChildren = [];
    for (var i = 0; i < this.state.questionKey; i += 1) {
      questionChildren.push(<QuestionField key={i} number={i} />);
    };
    return (
      <form >
        {questionChildren}
        <button type="button" onClick={()=>this.addAQuestionToSurvey()}>Add A New Question</button>
      </form>
    );
  }

}

export default SurveyForm;
