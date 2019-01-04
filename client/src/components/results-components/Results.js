import React, { Component } from 'react';
import ResultsSummary from './ResultsSummary';
import ResultsBigFive from './ResultsBigFive';
import ResultsNeeds from './ResultsNeeds';
import ResultsValues from './ResultsValues';
import ResultsConsumerPref from './ResultsConsumerPref';
import axios from 'axios';
import cookie from 'react-cookies';

// Material-UI Components
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#008552',
    },
    secondary: {
      main: '#512DA8',
    }
  },
  typography: {
    useNextVariants: true
  },
});

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warnings: {},
      wordCount: null,
      activeTab: "1",
      sourceModal: false,
      value: 0,
    }
  }

  handleChange = (event, value) => {
    this.setState({
      value
    });
  };

  componentDidMount() {
    axios.get(`/api/users/personality/${this.props.match.params.slackID}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie.load('jwt')}`
      }
    })
    .then(res => {
      this.setState({
        resultData: res.data,
      });
    })
    .catch((err) => {
      console.error(`There was an error retrieving surveys: ${err}`)
    });
  }

  render() {
    const summary = this.state.resultData && <ResultsSummary resultData={this.state.resultData} />;
    const bigFive = this.state.resultData &&  <ResultsBigFive resultData={this.state.resultData["personality"]} />;
    const resultNeeds =  this.state.resultData && <ResultsNeeds resultData={this.state.resultData["needs"]} />;
    const resultValues = this.state.resultData &&  <ResultsValues resultData={this.state.resultData["values"]} />;
    const consumerPrefs = this.state.resultData &&  <ResultsConsumerPref resultData={this.state.resultData["consumption_preferences"]} />;
    const {value} = this.state;

    return (
      this.state.resultData ?
      <div className="site-content--results">
        <MuiThemeProvider theme={theme}>
          <AppBar position="static" color="primary">
            <Tabs value={value} onChange={this.handleChange} scrollable={true} scrollButtons="off">
              <Tab label="Summary" />
              <Tab label="Big Five" />
              <Tab label="Needs" />
              <Tab label="Values" />
              <Tab label="Consumer Preferences" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer>{summary}</TabContainer>}
          {value === 1 && <TabContainer>{bigFive}</TabContainer>}
          {value === 2 && <TabContainer>{resultNeeds}</TabContainer>}
          {value === 3 && <TabContainer>{resultValues}</TabContainer>}
          {value === 4 && <TabContainer>{consumerPrefs}</TabContainer>}
        </MuiThemeProvider>
      </div>
      :
      <div className="site-content--results">Loading...</div>
    );
  }
}

export default Results;
