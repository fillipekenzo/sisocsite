import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 10px;
  width: 100%;

  border: 2px solid #0e141a;
  color: #b9c0c1;

  display: flex;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #219150;
      border-color: #219150;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #219150;
    `}

  input {
    flex: 1;
    padding: 16px 16px 16px 0;
    background: transparent;
    border: 0;
    color: #1a2530;

    &::placeholder {
      color: #b9c0c1;
    }
  }

  svg {
    margin: 0 16px;
  }

  & + div {
    margin-top: 8px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
