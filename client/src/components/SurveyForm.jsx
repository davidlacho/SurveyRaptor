import React, {
  Component
} from 'react';
import QuestionField from './QuestionField';
import cookie from 'react-cookies';
import axios from 'axios';
// Material-UI Components
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';


// TODO: Remove after getting cookie
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

class SurveyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionKey: 1,
      questions: {},
      jwt: '',
      submitted: false,
    }

    const saveQuestion = this.saveQuestion.bind(this);
    const saveAnswer = this.saveAnswer.bind(this);
    const submitQuestions = this.submitQuestions.bind(this);
  }

  componentDidMount() {
    this.setState({
      jwt: cookie.load('jwt'),
    });

  }

  saveQuestion = (key, question) => {
    const questionObject = this.state.questions;
    questionObject[key] = {
      question: question
    };

    this.setState({
      questions: questionObject,
    });

  }

  addAQuestionToSurvey = (event) => {
    if (!!this.state.questions[this.state.questionKey - 1]) {
      this.setState({
        questionKey: this.state.questionKey + 1,
      });
    }
  };

  saveAnswer = (questionKey, answerKey, answer) => {
    const questionObject = this.state.questions;
    if (!questionObject[questionKey]) {
      questionObject[questionKey] = {
        question: ''
      };
    }

    if (!questionObject[questionKey].possibleAnswers) {
      questionObject[questionKey].possibleAnswers = [];
    }

    if (!questionObject[questionKey].possibleAnswers[answerKey]) {
      questionObject[questionKey].possibleAnswers[answerKey] = '';
    }

    questionObject[questionKey].possibleAnswers[answerKey] = answer;

    this.setState({
      questions: questionObject,
    });
  }

  submitQuestions = () => {
    axios.post('/api/buildsurvey',
        this.state.questions, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.jwt}`
          }
        })
      .then(res => {
        this.setState({
          submitted: true,
        })
      })

  }

  render() {
    const questionChildren = [];

    for (var i = 1; i < this.state.questionKey; i += 1) {
      questionChildren.push(<QuestionField key={i} number={i} saveQuestion={this.saveQuestion} saveAnswer={this.saveAnswer}/>);
    };

    const questionButton = (this.state.questionKey <= 3) && (this.state.questions[this.state.questionKey - 1]) ? <Button className="form-button" color="primary" variant="contained" onClick={()=>this.addAQuestionToSurvey()}>Add A New Question</Button> : '';

    const submitButton = (this.state.questions[this.state.questionKey - 1]) ?  <Button className="form-button" color="primary" variant="contained" onClick={this.submitQuestions}>Send<Icon>send</Icon>
      </Button> : '';

    return (
      !this.state.submitted ?
      (<form className="form-container" autoComplete="off">
        <QuestionField key={0} number={0} saveQuestion={this.saveQuestion} saveAnswer={this.saveAnswer} />
        {questionChildren}
        {questionButton}
        {submitButton}
      </form>
      )
      :
      <p>Submitted!</p>
    );
  }
}

export default SurveyForm;
