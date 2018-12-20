import React, { Component } from 'react';

class SurveyBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [''],
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleText = i => e => {
    let questions = [...this.state.questions];

    questions[i] = e.target.value;

    this.setState({
      questions
    });

    console.log(questions);
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

  addQuestion = e => {
    e.preventDefault();

    let questions = this.state.questions.concat(['']);

    this.setState({
      questions
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.questions);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.questions.map((question, index) => (
          <div key={index}>
            <input
              type="text"
              onChange={this.handleText(index)}
              value={question}
            />

            <button onClick={this.handleDelete(index)}>
              Delete
            </button>
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

export default SurveyBuilder;
