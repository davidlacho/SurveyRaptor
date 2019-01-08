import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

// Material-UI Components
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class SurveyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      surveys: [],
    };

  }

  componentDidMount() {
    axios.get('/api/user/surveys', {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie.load('jwt')}`
      }
    })
    .then(res => {
      this.setState({
        surveys: res.data,
      });
    })
    .catch((err) => {
      console.error(`There was an error retrieving surveys: ${err}`)
    });
  }

  render() {
    const surveys = this.state.surveys;
    const surveysList = surveys.map((list) => {
      if (!list) {
        return false;
      }

      // Remove time from the created at date value
      const listDate = list.createdAt.split('T')[0];

      return (
        <TableRow key={list.surveyID}>
          <TableCell data-table-label="Survey ID">
            <Link to={`/user/surveys/${list.surveyID}`}>
              {list.surveyID}
            </Link>
          </TableCell>
          <TableCell data-table-label="Name">
            <Link to={`/user/surveys/${list.surveyID}`}>
              {list.name}
            </Link>
          </TableCell>
          <TableCell data-table-label="Respondents">
            <Link to={`/user/surveys/${list.surveyID}`}>
              {list.respondentCount}
            </Link>
          </TableCell>
          <TableCell data-table-label="Date">
            <Link to={`/user/surveys/${list.surveyID}`}>
              {listDate}
            </Link>
          </TableCell>
        </TableRow>
      )
    });

    return (
      <div className="site-content">
        <h2>SurveyList</h2>

        <Paper className="table-wrapper">
          <Table className="table-container">
            <TableHead>
              <TableRow>
                <TableCell>Survey ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Respondents</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {surveysList}
            </TableBody>
          </Table>
        </Paper>

        <Button className="form-button" color="primary" variant="contained" component={Link} to="/build-survey">Build Survey</Button>
      </div>
    );
  }
}

export default SurveyList;
