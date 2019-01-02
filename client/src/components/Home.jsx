import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import SurveyList from './SurveyList.jsx';
import TeamSelector from './team-values/TeamSelector.jsx'

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#008552',
    },
    secondary: {
      main: '#512DA8',
    }
  },
  typography: { useNextVariants: true },
});

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
        <MuiThemeProvider theme={theme}>
          <AppBar position="static" color="primary">
            <Tabs value={value} onChange={this.handleChange} scrollable={true} scrollButtons="off">
              <Tab label="My Surveys" />
              <Tab label="Team Values" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer><SurveyList /></TabContainer>}
          {value === 1 && <TabContainer><TeamSelector /></TabContainer>}
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Home;
