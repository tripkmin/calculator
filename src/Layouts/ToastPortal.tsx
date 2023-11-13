import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { timer } from 'styles/constants';
import { ToastT } from 'types/type';

const ToastList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Toast = styled(motion.div)`
  background-color: ${props => props.theme.buttonTypeB};
  transition: background-color ${timer.default}, color ${timer.default};
  color: ${props => props.theme.fontColorTypeC};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
`;

interface ToastPortalT {
  toasts?: ToastT[];
}

export default function ToastPortal({ toasts }: ToastPortalT) {
  return createPortal(
    <ToastList>
      <AnimatePresence>
        {toasts?.map(t => (
          <Toast
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: 'spring' }}
            exit={{ opacity: 0, y: -20 }}
            key={t.id}
          >
            {t.content}
          </Toast>
        ))}
      </AnimatePresence>
    </ToastList>,
    document.querySelector('#toast') as HTMLElement
  );
}
