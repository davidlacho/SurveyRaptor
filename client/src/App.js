import React, { Component } from 'react';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import SurveyBuilder from './components/SurveyBuilder.jsx';
import DeploymentOptions from './components/DeploymentOptions.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SurveyBuilder />
        <DeploymentOptions />
        <Footer />
      </div>
    );
  }
}

export default App;
