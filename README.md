# SurveyRaptor

We're a polling tool for Slack that helps you gauge decisions that will affect your team by building personality profiles that adjust and evolve over time.

www.surveyraptor.com

### Final Product

!["SurveyRaptor GIF"](https://github.com/fiveache/SurveyRaptor/blob/master/docs/SurveyRaptor-Screens.gif)

### Technical Specifications

- Front-End: React, React Router, Material UI, ECharts, JSX, SASS

- Back-End: NodeJS, Express, JSON Web Tokens with Passport, PostgreSQL, KNEX.JS, Slack API, IBM Watson API, Heroku

### Getting Started

-   Clone this repository
    `git clone https://github.com/fiveache/SurveyRaptor.git`

-   Install dependencies using `npm install`

-   For running on your local machine, Go to `server.js` and uncomment the `require('dotenv').config();`

-   Create a `.env` file using the `.env.example` found in the root of the project and enter the details of your PSQL database. We used [ElephantSQL](https://www.elephantsql.com/) for our database.

-   In the root directory, run `npm run dev-start`. It will install necessary node modules for the client side.

-   Preview the project at <http://localhost:5000/>.
