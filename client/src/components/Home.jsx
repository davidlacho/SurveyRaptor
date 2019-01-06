import React, { Component } from 'react';
import SurveyList from './surveys/SurveyList.jsx';
import TeamSelector from './team-values/TeamSelector.jsx';

// Material-UI Components
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div className="site-content--results">
        <AppBar position="static" color="primary">
          <Tabs value={value} onChange={this.handleChange} scrollable={true} scrollButtons="off">
            <Tab label="My Surveys" />
            <Tab label="Team Values" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><SurveyList /></TabContainer>}
        {value === 1 && <TabContainer><TeamSelector /></TabContainer>}
      </div>
    )
  }
}

export default Home;
