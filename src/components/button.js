import React from 'react';
import styled from 'styled-components';
import { Button as MuiButton } from '@material-ui/core';

const ButtonWrapper = styled.div`
  margin: 50px;
`;

const Button = ({ children, ...props }) => (
  <ButtonWrapper>
    <MuiButton color="primary" variant="contained" {...props}>
      {children}
    </MuiButton>
  </ButtonWrapper>
);

export default Button;
