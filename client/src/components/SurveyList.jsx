import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

    this.state = {};
  }

  render() {
    let id = 0;
    function createData(name, date, respondents) {
      id += 1;
      return { id, name, date, respondents };
    }

    const rows = [
      createData('Frozen yoghurt', `12-09-18`, 10),
      createData('Ice cream sandwich', `12-09-18`, 22),
      createData('Eclair', `12-09-18`, 56),
      createData('Cupcake', `12-09-18`, 23),
      createData('Gingerbread', `12-09-18`, 12),
    ];

    return (
      <div className="site-content">
        <Paper>
          <Table className="table-container">
            <TableHead>
              <TableRow>
                <TableCell>Survey ID</TableCell>
                <TableCell>Survey Name</TableCell>
                <TableCell>Survey Respondents</TableCell>
                <TableCell>Survey Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.respondents}</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>

        <Button className="form-button" color="primary" variant="contained" component={Link} to="/build-survey">New Survey</Button>
      </div>
    );
  }
}

export default SurveyList;
