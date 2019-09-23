import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Typography } from '@material-ui/core';

import ButtonContainer from './components/button-container';
import { isValidState, isValidInstructions } from './utils/validation-utils';

const MAX_ROVERS = 10;

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

const RoverRow = ({ id }) => {
  const [isStartStateStringValid, setIsStartStateStringValid] = useState(true);
  const [isInstructionsStringValid, setIsInstructionsStringValid] = useState(
    true
  );

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
        value="3 4 S"
        helperText="Space-separated values: X Y BEARING"
        InputProps={{
          readOnly: true
        }}
      />
    </StyledRow>
  );
};

export const removeRover = rovers => [...rovers.slice(0, rovers.length - 1)];

export const addRover = rovers => [
  ...rovers,
  { id: rovers[rovers.length - 1].id + 1 }
];

const App = () => {
  const [rovers, setRovers] = useState([{ id: 0 }]);

  return (
    <div>
      <ButtonContainer
        onRemoveButtonClick={() => {
          setRovers(removeRover(rovers));
        }}
        isRemoveButtonDisabled={rovers.length === 1}
        onAddButtonClick={() => {
          setRovers(addRover(rovers));
        }}
        isAddButtonDisabled={rovers.length === MAX_ROVERS}
      />
      {rovers.map(rover => (
        <RoverRow key={rover.id} {...rover} />
      ))}
    </div>
  );
};

export default App;
