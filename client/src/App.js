import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Main components
import Header from './components/layout/Header.jsx';
import NotFound from './components/NotFound';

// Survey components
import SurveyList from './components/surveys/SurveyList.jsx';
import SurveyBuilder from './components/surveys/SurveyBuilder.jsx';
import SurveyResults from './components/surveys/SurveyResults.jsx';
import TeamSelector from './components/team/TeamSelector.jsx';
import Results from './components/results/Results.js';

// Material-UI Components
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#008552',
    },
    secondary: {
      main: '#512DA8',
    },
  },
  typography: { useNextVariants: true },
});

const App = () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={SurveyList} />
          <Route exact path="/surveys" component={SurveyList} />
          <Route path="/build-survey" component={SurveyBuilder} />
          <Route path="/user/surveys/:id" component={SurveyResults} />
          <Route path="/values/:slackID" component={Results} />
          <Route path="/values" component={TeamSelector} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </MuiThemeProvider>
  </BrowserRouter>
);

export default App;
