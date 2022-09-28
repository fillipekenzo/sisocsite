import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface Props {
  type?: 'success' | 'error' | 'info';
  hasdescription: number;
}

const toastTypes = {
  info: css`
    background: #f9ed9e;
    color: #b6841f;
  `,
  success: css`
    background: #affbb8;
    color: #27633d;
  `,
  error: css`
    background: #f79f9f;
    color: #c53030;
  `,
};

export const Container = styled(animated.div) <Props>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  z-index:10000;
  display: flex;

  & + div {
    margin-top: 6px;
  }

  ${(props) => toastTypes[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 1.4rem;
      opacity: 0.8;
      line-height: 2rem;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${(props) =>
    !props.hasdescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
