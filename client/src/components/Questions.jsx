import React, { Component } from 'react';
import $ from 'jquery';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [''],
      answers: [''],
    }

    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
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

    const question =  this.refs.question.value;
    const answer = this.refs.answer.value;
    const data = {
      question: question,
      answer: answer
    };

    $.ajax({
      url: '/api/buildsurvey',
      method: 'POST',
      data: data,
      dataType: 'json',
      success: function(result){
        console.log("its looks good");
      },
      error: function(error){
        console.log("there was an error");
      }
    });
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

            {this.state.possibleAnswers.map((answer, index) => (
              <div key={this.getKey()}>
                <label htmlFor="possible_answer">Possible Answer:</label>
                <input
                  name="possible_answer"
                  type="text"
                  ref="answer"
                  defaultValue= "Test Answer"
                />

                <button>
                  Add Possible Answer
                </button>
              </div>
            ))}
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
