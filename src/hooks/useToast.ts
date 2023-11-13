import { useEffect, useState } from 'react';
import { ToastT } from 'types/type';

export default function useToast() {
  const [toasts, setToasts] = useState<ToastT[]>([]);
  const [removeId, setRemoveId] = useState('');

  useEffect(() => {
    setToasts(t => t.filter(_t => _t.id !== removeId));
  }, [removeId]);

  useEffect(() => {
    if (toasts.length) {
      const id = toasts[toasts.length - 1].id;
      setTimeout(() => {
        setRemoveId(id);
      }, 2000);
    }
  }, [toasts]);

  return { toasts, setToasts };
}
