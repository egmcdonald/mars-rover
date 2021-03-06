import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, Typography } from '@material-ui/core';

import {
  isValidStateString,
  isValidInstructions,
  isValidState
} from '../utils/validation-utils';
import { calculateEndState } from '../utils/rover-utils';

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

/**
 * @param {Object} params
 * @param {string} params.startStateString
 * @param {(arg0: {x: number, y: number, bearing: string}) => void} params.setStartState
 * @param {{x: number, y: number}} params.gridBoundary
 */
export function onStartStateChangeHandler({
  startStateString,
  setStartState,
  gridBoundary
}) {
  if (isValidStateString(startStateString)) {
    const [x, y, bearing] = startStateString.split(' ');
    const parsedState = { x: parseInt(x), y: parseInt(y), bearing };
    setStartState(
      (isValidState({ state: parsedState, gridBoundary }) && parsedState) ||
        null
    );
  } else {
    setStartState(null);
  }
}

/**
 * @param {Object} params
 * @param {string} params.instructionsString
 * @param {(arg0: string) => void} params.setInstructions
 */
export const onInstructionsChangeHandler = ({
  instructionsString,
  setInstructions
}) =>
  setInstructions(
    isValidInstructions(instructionsString) ? instructionsString : null
  );

/**
 * @param {Object} props
 * @param {number} props.id
 * @param {{x: number, y: number}} props.gridBoundary
 */
export default function RoverRow({ id, gridBoundary }) {
  const [startState, setStartState] = useState(null);
  const [instructions, setInstructions] = useState(null);
  const [endState, setEndState] = useState(null);

  useEffect(() => {
    const endStateCanBeCalculated = startState && instructions;
    setEndState(
      endStateCanBeCalculated && calculateEndState({ startState, instructions })
    );
  }, [startState, instructions]);

  return (
    <StyledRow>
      <Typography variant="h4">Rover {id}</Typography>
      <TextField
        label="Start state"
        placeholder="e.g. 1 2 N"
        helperText="Space-separated values: X Y BEARING"
        error={!startState}
        onChange={e =>
          onStartStateChangeHandler({
            startStateString: e.target.value,
            setStartState,
            gridBoundary
          })
        }
      />
      <TextField
        label="Instructions to rove"
        placeholder="e.g. LMRLMR"
        helperText="L for Left, R for Right, M for Move"
        error={!instructions}
        onChange={e =>
          onInstructionsChangeHandler({
            instructionsString: e.target.value,
            setInstructions
          })
        }
      />
      <TextField
        label="End state"
        value={
          (endState && `${endState.x} ${endState.y} ${endState.bearing}`) || ''
        }
        error={!endState || !isValidState({ state: endState, gridBoundary })}
        helperText="Space-separated values: X Y BEARING"
        InputProps={{
          readOnly: true
        }}
      />
    </StyledRow>
  );
}
