import React, { Component } from 'react';

class PossibleAnswers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.changeValue = this.changeValue.bind(this);
  }

  changeValue = (value) => {
    this.setState({
      value: value
    });
  }

  render() {
    return (
      <div>
        <label htmlFor="possible_answer">Possible Answer:</label>
        <input
          name="possible_answer"
          type="text"
          ref="answer"
          defaultValue="Test Answer"
          onChange={(event) => {this.changeValue(event.target.value)}}
        />

        <button onClick={() => {this.props.addAnswer(this.state.value)}}>
          Add Possible Answer
        </button>
      </div>
    );
  }
}

export default PossibleAnswers;
