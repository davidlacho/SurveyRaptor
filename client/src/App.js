import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import SurveyBuilder from './components/SurveyBuilder.jsx';
import SurveyResults from './components/SurveyResults.jsx';
import NotFound from './components/NotFound';
import Home from './components/Home.jsx';
import Results from './components/results-components/Results.js';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/build-survey" component={SurveyBuilder} />
        <Route path="/user/surveys" component={SurveyResults} />
        <Route path="/values/:slackID" component={Results} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
