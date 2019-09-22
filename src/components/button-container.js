import React from 'react';
import styled from 'styled-components';

import Button from './button';

const ButtonContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonContainer = () => (
  <ButtonContainerWrapper>
    <Button>Remove a rover!</Button>
    <Button>Add a rover!</Button>
  </ButtonContainerWrapper>
);

export default ButtonContainer;
