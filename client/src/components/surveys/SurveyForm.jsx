import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import QuestionField from './QuestionField';
import DeploymentOptions from './DeploymentOptions.jsx';
import SurveyList from './SurveyList.jsx';


// Material-UI Components
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

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
      selectedUsers: [],
      surveyName: '',
    }

    this.saveQuestion = this.saveQuestion.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
    this.submitQuestions = this.submitQuestions.bind(this);
    this.toggleSelectedUsers = this.toggleSelectedUsers.bind(this);
  }

  componentDidMount() {
    this.setState({
      jwt: cookie.load('jwt'),
    });
  }

  setSurveyName = (event) => {
    this.setState({
      surveyName: event.target.value,
    });
  }

  toggleSelectedUsers = (name) => {
    const selectedUsers = this.state.selectedUsers;
    const indexOfName = selectedUsers.indexOf(name);

    if (indexOfName === -1) {
      selectedUsers.push(name);

      this.setState({
        selectedUsers: selectedUsers,
      });
    } else {
      selectedUsers.splice(indexOfName, 1);

      this.setState({
        selectedUsers: selectedUsers,
      });
    }
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
  }

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

    if (!(answerKey === 1 && !questionObject[questionKey].possibleAnswers[0])){
      const removeEmpties = questionObject[questionKey].possibleAnswers.filter((el) => el !== '');
      questionObject[questionKey].possibleAnswers = removeEmpties;
    }


    this.setState({
      questions: questionObject,
    });
  }

  submitQuestions = () => {
    axios.post('/api/buildsurvey', {
      questions: this.state.questions,
      users: this.state.selectedUsers,
      name: this.state.surveyName,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.jwt}`
      }
    })
    .then(res => {
      this.setState({
        submitted: true,
      })
    });
  }

  render() {
    const questionChildren = [];

    for (var i = 1; i < this.state.questionKey; i += 1) {
      questionChildren.push(<QuestionField key={i} number={i} saveQuestion={this.saveQuestion} saveAnswer={this.saveAnswer} value={this.state.questions[i] ? this.state.questions[i].question : ''} possibleAnswers={this.state.questions[i] ?
        this.state.questions[i].possibleAnswers ?
        this.state.questions[i].possibleAnswers : []
        : []}/>);
    };

    const questionButton = (this.state.questionKey <= 3) && (this.state.questions[this.state.questionKey - 1]) ? <Button className="form-button" color="primary" variant="contained" onClick={() => this.addAQuestionToSurvey()}>Add A New Question</Button> : '';

    const submitButton = (this.state.questions[this.state.questionKey - 1] && this.state.selectedUsers.length >= 1) && this.state.surveyName ? <Button className="form-button" color="primary" variant="contained" onClick={this.submitQuestions}>Send <Icon>send</Icon></Button> : '';

    const firstQuestionField =
      <QuestionField key={0} number={0} saveQuestion={this.saveQuestion} saveAnswer={this.saveAnswer} value={this.state.questions[0] ? this.state.questions[0].question : ''} possibleAnswers={this.state.questions[0] ?
      this.state.questions[0].possibleAnswers ?
      this.state.questions[0].possibleAnswers : []
      : []}/>;

    return (
      !this.state.submitted ?
      (
        <form className="form-container" autoComplete="off">
          <h2>SurveyBuilder</h2>

          <TextField
            label="Survey name"
            placeholder="Survey name"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ maxLength: 60 }}
            onKeyUp={this.setSurveyName}
          />

          {firstQuestionField}
          {questionChildren}
          {questionButton}

          <DeploymentOptions toggleSelectedUsers={this.toggleSelectedUsers} selectedUsers={this.state.selectedUsers} />

          {submitButton}
        </form>
      ) :
      <React.Fragment><SurveyList /></React.Fragment>
    );
  }
}

export default SurveyForm;
