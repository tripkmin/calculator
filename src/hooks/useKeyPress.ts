import { useEffect, useState } from 'react';

export default function useKeyPress() {
  const [pressedKey, setPressedKey] = useState('');

  const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const OPERATIONS = ['+', '-', '*', '/'];
  const ETC = ['Enter', 'Escape', 'Backspace', '.'];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        NUMBERS.includes(parseInt(e.key)) ||
        OPERATIONS.includes(e.key) ||
        ETC.includes(e.key)
      ) {
        const button = document.querySelector(
          `button[value="${e.key}"]`
        ) as HTMLButtonElement;

        button.click();
        setPressedKey(e.key);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setPressedKey('');
    }, 100);

    return () => {
      clearTimeout(id);
    };
  }, [pressedKey]);

  return { pressedKey };
}
