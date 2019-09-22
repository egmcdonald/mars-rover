import React from 'react';
import styled from 'styled-components';

import Button from './button';

const ButtonContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonContainer = ({
  onRemoveButtonClick,
  isRemoveButtonDisabled,
  onAddButtonClick,
  isAddButtonDisabled
}) => (
  <ButtonContainerWrapper>
    <Button onClick={onRemoveButtonClick} disabled={isRemoveButtonDisabled}>
      Remove a rover!
    </Button>
    <Button onClick={onAddButtonClick} disabled={isAddButtonDisabled}>
      Add a rover!
    </Button>
  </ButtonContainerWrapper>
);

export default ButtonContainer;
