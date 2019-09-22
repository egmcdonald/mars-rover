import React from 'react';
import styled from 'styled-components';
import { TextField, Typography } from '@material-ui/core';

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  padding: 20px;
  border: solid #3f51b5 1px;

  @media only screen and (max-width: 980px) {
    flex-direction: column;
  }
`;

const App = () => (
  <StyledRow>
    <Typography variant="h4">Rover A</Typography>
    <TextField
      label="Start state"
      placeholder="e.g. 1 2 N"
      helperText="Space-separated values: X Y BEARING"
    />
    <TextField
      label="Instructions to rove"
      placeholder="e.g. LMRLMR"
      helperText="L for Left, R for Right, M for Move"
    />
    <TextField
      label="End state"
      value="3 4 S"
      helperText="Space-separated values: X Y BEARING"
      InputProps={{
        readOnly: true
      }}
    />
  </StyledRow>
);

export default App;
