import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../title';

export default function Events({title, number}) {
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Typography component="h2" variant='h3' color="#000">
        {number}
      </Typography>

    </React.Fragment>
  );
}