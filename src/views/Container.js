import React from 'react';
import { Grid } from 'react-bootstrap';

export default function Container({ children }) {
  const containerStyle = {
    paddingTop: 50,
    paddingBottom: 50,
  };
  return (
    <Grid style={containerStyle}>
      {children}
    </Grid>
  )
}
