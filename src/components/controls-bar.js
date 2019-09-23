import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

import Button from './button';

const ControlBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridBoundaryWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ControlsBar = ({
  onGridBoundaryChanged,
  isGridBoundaryStringValid,
  onRemoveButtonClick,
  isRemoveButtonDisabled,
  onAddButtonClick,
  isAddButtonDisabled
}) => (
  <ControlBarWrapper>
    <GridBoundaryWrapper>
      <TextField
        label="Grid boundary"
        placeholder="e.g. 4 5"
        helperText="Space-separated values: X Y"
        error={!isGridBoundaryStringValid}
        onChange={onGridBoundaryChanged}
      />
    </GridBoundaryWrapper>
    <ButtonContainerWrapper>
      <Button onClick={onRemoveButtonClick} disabled={isRemoveButtonDisabled}>
        Remove a rover!
      </Button>
      <Button onClick={onAddButtonClick} disabled={isAddButtonDisabled}>
        Add a rover!
      </Button>
    </ButtonContainerWrapper>
  </ControlBarWrapper>
);

export default ControlsBar;
