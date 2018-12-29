import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

// Material-UI Components
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
      })
  }

  render() {
    const surveys = this.state.surveys;
    const surveysList = surveys.map((list) => {
      if (!list) {
        return false;
      }

      return (
        <TableRow key={list.surveyID}>
          <TableCell>{list.surveyID}</TableCell>
          <TableCell>{list.name || 'No name'}</TableCell>
          <TableCell>{list.respondentCount}</TableCell>
          <TableCell>{list.createdAt}</TableCell>
        </TableRow>
      )
    });

    return (
      <div className="site-content">
        <Paper>
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

        <Button className="form-button" color="primary" variant="contained" component={Link} to="/build-survey">New Survey</Button>
      </div>
    );
  }
}

export default SurveyList;
