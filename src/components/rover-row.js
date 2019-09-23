import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, Typography } from '@material-ui/core';

import { isValidState, isValidInstructions } from '../utils/validation-utils';

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

export default function RoverRow({ id, gridBoundary }) {
  const [startState, setStartState] = useState(null);
  const [instructions, setInstructions] = useState(null);
  const [endState, setEndState] = useState('');

  useEffect(() => {
    const endStateCanBeCalculated = startState && instructions;
    setEndState(endStateCanBeCalculated ? 'Ready to be calculated' : '');
  }, [startState, instructions]);

  return (
    <StyledRow>
      <Typography variant="h4">Rover {id}</Typography>
      <TextField
        label="Start state"
        placeholder="e.g. 1 2 N"
        helperText="Space-separated values: X Y BEARING"
        error={!startState}
        onChange={e => {
          const stateString = e.target.value;
          if (isValidState(stateString)) {
            const [x, y, bearing] = stateString.split(' ');
            const parsedState = { x: parseInt(x), y: parseInt(y), bearing };
            setStartState(
              gridBoundary &&
                parsedState.x <= gridBoundary.x &&
                parsedState.y <= gridBoundary.y &&
                parsedState
            );
          } else {
            setStartState(null);
          }
        }}
      />
      <TextField
        label="Instructions to rove"
        placeholder="e.g. LMRLMR"
        helperText="L for Left, R for Right, M for Move"
        error={!instructions}
        onChange={e => {
          const instructionsString = e.target.value;
          if (isValidInstructions(instructionsString)) {
            setInstructions(instructionsString);
          } else {
            setInstructions(null);
          }
        }}
      />
      <TextField
        label="End state"
        value={endState}
        error={!endState}
        helperText="Space-separated values: X Y BEARING"
        InputProps={{
          readOnly: true
        }}
      />
    </StyledRow>
  );
}
