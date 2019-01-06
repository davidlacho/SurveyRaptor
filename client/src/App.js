import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Main components
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './components/Home.jsx';
import NotFound from './components/NotFound';

// Survey components
import SurveyBuilder from './components/surveys/SurveyBuilder.jsx';
import SurveyResults from './components/surveys/SurveyResults.jsx';
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
    }
  },
  typography: { useNextVariants: true },
});

const App = () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/build-survey" component={SurveyBuilder} />
          <Route path="/user/surveys/:id" component={SurveyResults} />
          <Route path="/values/:slackID" component={Results} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </MuiThemeProvider>
  </BrowserRouter>
);

export default App;
