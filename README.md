# Survey Raptor

## Getting Started

-   Clone this repository
    `git clone https://github.com/fiveache/SurveyRaptor.git`

-   Install dependencies using `npm install`

-   For running on your local machine, Go to `server.js` and uncomment the `require('dotenv').config();`

-   Create a `.env` file using the `.env.example` found in the root of the project and enter the details of your PSQL database. We used [ElephantSQL](https://www.elephantsql.com/) for our database.

-   In the root directory, run `npm run dev-start`. It will install necessary node modules for the client side.

-   Preview the project at <http://localhost:5000/>.
