import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Typography } from '@material-ui/core';

import ButtonContainer from './components/button-container';

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

const RoverRow = ({ id }) => (
  <StyledRow>
    <Typography variant="h4">Rover {id}</Typography>
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

const App = () => {
  const [rovers, setRovers] = useState([{ id: 0 }, { id: 1 }, { id: 2 }]);

  return (
    <div>
      <ButtonContainer />
      {rovers.map(rover => (
        <RoverRow key={rover.id} {...rover} />
      ))}
    </div>
  );
};

export default App;
