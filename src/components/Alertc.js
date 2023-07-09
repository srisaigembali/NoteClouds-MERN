import React from 'react';
import { Alert } from 'react-bootstrap';

const Alertc = (props) => {
  return (
    <div>
      <Alert variant="primary">{props.message}</Alert>
    </div>
  );
};

export default Alertc;
