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

export default function RoverRow({ id }) {
  const [isStartStateStringValid, setIsStartStateStringValid] = useState(false);
  const [isInstructionsStringValid, setIsInstructionsStringValid] = useState(
    false
  );
  const [endState, setEndState] = useState('');

  useEffect(() => {
    setEndState(
      (isStartStateStringValid &&
        isInstructionsStringValid &&
        'Ready to be calculated') ||
        ''
    );
  }, [isStartStateStringValid, isInstructionsStringValid]);

  return (
    <StyledRow>
      <Typography variant="h4">Rover {id}</Typography>
      <TextField
        label="Start state"
        placeholder="e.g. 1 2 N"
        helperText="Space-separated values: X Y BEARING"
        error={!isStartStateStringValid}
        onChange={e => setIsStartStateStringValid(isValidState(e.target.value))}
      />
      <TextField
        label="Instructions to rove"
        placeholder="e.g. LMRLMR"
        helperText="L for Left, R for Right, M for Move"
        error={!isInstructionsStringValid}
        onChange={e =>
          setIsInstructionsStringValid(isValidInstructions(e.target.value))
        }
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
