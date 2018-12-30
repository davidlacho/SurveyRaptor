import React from 'react';
import { Link } from 'react-router-dom';

// Material-UI Components
import Button from '@material-ui/core/Button';

const NotFound = () => (
  <div className="site-content not-found">
    <h2 className="not-found--title">
      <i className="material-icons icon-error">error_outline</i> 404 - Page Not Found
    </h2>

    <p>Well, we weren't expecting this...</p>
    <img src="/banana-cactus.jpeg" alt="404 Not Found" />
    <Button className="form-button" color="primary" variant="contained" component={Link} to="/">Go build a survey</Button>
  </div>
);

export default NotFound;
