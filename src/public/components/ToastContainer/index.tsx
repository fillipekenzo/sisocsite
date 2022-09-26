import React from 'react';
import { useTransition } from 'react-spring';

import { ToastMessage } from '../../../features/toast';

import Toast from './Toast';
import { Container } from './styles';

interface Props {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<Props> = ({ messages }) => {
  const messageWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      enter: { right: '0%', opacity: 1 },
      leave: { right: '0%' },
    }
  );


  return (
    <Container>
      {messageWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
