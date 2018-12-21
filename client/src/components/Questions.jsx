import React, { Component } from 'react';
// import $ from 'jquery';

// Components
import PossibleAnswers from './PossibleAnswers';

// TODO: Remove after getting cookie
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [''],
      answers: [],
    }

    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.addAnswer = this.addAnswer.bind(this);

  }

  addAnswer = (value) => {
    let answers = this.state.answers;
    answers.push(value);

    this.setState({
      answers
    });
  }

  getKey() {
    return this.keyCount++;
  }

  handleText = index => event => {
    let questions = [...this.state.questions];

    questions[index] = event.target.value;

    this.setState({
      questions
    });
  }

  handleDelete = index => event => {
    event.preventDefault();

    let questions = [
      ...this.state.questions.slice(0, index),
      ...this.state.questions.slice(index + 1)
    ];

    this.setState({
      questions
    });
  }

  addQuestion = event => {
    event.preventDefault();

    let questions = this.state.questions.concat(['']);

    this.setState({
      questions
    });
  }



  handleSubmit(event) {
    event.preventDefault();

    // const question =  this.refs.question.value;
    // const answer = this.refs.answer.value;
    // const data = {
    //   questions: [
    //     {
    //       question: question,
    //       possibleAnswers: [answer],
    //     }
    //   ]
    // };

    // $.ajax({
    //   url: '/api/buildsurvey',
    //   method: 'POST',
    //   // TODO: GRAB COOKIE FROM USER AND PUT IT IN HERE (ASK DIVAD):
    //   headers: {'Authorization': process.env.TEST_HEADER_AUTH},
    //   data: data,
    //   dataType: 'json',
    //   success: function(result) {
    //     console.log(result);
    //   },
    //   error: function(error) {
    //     console.log(error);
    //   }
    // });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.questions.map((question, index) => (
          <div key={this.getKey()}>
            <label htmlFor="question">Question:</label>
            <input
              name="question"
              type="text"
              ref="question"
              defaultValue= "Test Question"
            />

            <button onClick={this.handleDelete(index)}>
              Delete
            </button>

            {this.state.answers.map((answer, index) => (
              <p>{ answer }</p>
            ))}

            <PossibleAnswers key={this.getKey()} addAnswer ={this.addAnswer}/>
          </div>
        ))}

        <button onClick={this.addQuestion}>
          Add New Question
        </button>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Questions;
