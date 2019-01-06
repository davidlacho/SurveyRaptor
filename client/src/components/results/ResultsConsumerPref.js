import React, { Component } from 'react';

class ResultsConsumerPref extends Component {
  constructor(props) {
    super(props);

    this.getRowClass = this.getRowClass.bind(this);
  }

  getRowClass(score) {
    if (score === 1) return "consumer-pref-success";
    else if (score === 0) return "consumer-pref-danger";
    else if (score === 0.5) return "consumer-pref-warning";
  }

  render() {
    return (
      <div className="wrapper-consumer-pref">
        {this.props.resultData.map(category => (
          <div key={"consumer-pref-" + category.consumption_preference_category_id} className="consumer-pref">
            <h2 className="text-center">{category.name}</h2>

            <ul key={"consumer-pref-" + category.consumption_preference_category_id}>
              {category.consumption_preferences.map(item => (
                <li key={"name-" + item.consumption_preference_id} className={this.getRowClass(item.score)}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default ResultsConsumerPref;
