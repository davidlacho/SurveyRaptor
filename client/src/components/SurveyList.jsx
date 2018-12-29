import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SurveyBuilder from './SurveyBuilder.jsx';

// Material-UI Components
import Button from '@material-ui/core/Button';

class SurveyList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="site-content">
        List of surveys here
        <Button className="form-button" color="primary" variant="contained" component={Link} to="/build-survey">New Survey</Button>
      </div>
    );
  }
}

export default SurveyList;
