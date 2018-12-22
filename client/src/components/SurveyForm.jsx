import React, {
  Component
} from 'react';
import QuestionField from './QuestionField';


// TODO: Remove after getting cookie
if (process.env.NODE_ENV !== 'production') require('dotenv').config();


class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionKey: 1,
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
    console.log(questionObject)
  }

  addAQuestionToSurvey = (event) => {
    if(!!this.state.questions[this.state.questionKey - 1]){
      this.setState({
        questionKey : this.state.questionKey + 1,
      });
    }
  };

  saveAnswer = (questionKey, answerKey, answer) => {
    const questionObject = this.state.questions;
    if(!questionObject[questionKey]){
      questionObject[questionKey] = {question: ''}
    }
    if(!questionObject[questionKey].possibleAnswers) {
      questionObject[questionKey].possibleAnswers = [];
    }
    if(!questionObject[questionKey].possibleAnswers[answerKey]) {
      questionObject[questionKey].possibleAnswers[answerKey] = '';
    }
    questionObject[questionKey].possibleAnswers[answerKey] = answer;
    this.setState({
      questions: questionObject,
    });
    console.log(questionObject)
  }

  render() {
    const questionChildren = [];
    for (var i = 1; i < this.state.questionKey; i += 1) {
      questionChildren.push(<QuestionField key={i} number={i} saveQuestion={this.saveQuestion} saveAnswer={this.saveAnswer}/>);
    };
    const questionButton =
    (this.state.questionKey <= 3) && (this.state.questions[this.state.questionKey - 1]) ? <button type="button" onClick={()=>this.addAQuestionToSurvey()}>Add A New Question</button> :'';

    return (
      <form >
        <QuestionField key={0} number={0} saveQuestion={this.saveQuestion} saveAnswer={this.saveAnswer}/>
        {questionChildren}
        {questionButton}
      </form>
    );
  }

}

export default SurveyForm;
