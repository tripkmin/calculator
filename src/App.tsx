import { MouseEvent, useEffect, useState } from 'react';

function App() {
  const [prevOperand, setPrevOperand] = useState('');
  const [currentOperand, setCurrentOperand] = useState('');
  const [operation, setOperation] = useState('');
  const [calcDone, setCalcDone] = useState(false);

  const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const OPERATIONS = ['+', '-', '*', '/'];
  const ETC = ['Enter', 'Escape', 'Backspace', '.'];

  const calculate = (operation: string) => {
    switch (operation) {
      case '+':
        return parseFloat(prevOperand) + parseFloat(currentOperand);
      case '-':
        return parseFloat(prevOperand) - parseFloat(currentOperand);
      case '*':
        return parseFloat(prevOperand) * parseFloat(currentOperand);
      case '/':
        return parseFloat(prevOperand) / parseFloat(currentOperand);
    }
  };

  const operate = (operation: string) => {
    if (prevOperand && !currentOperand) {
      setOperation(operation);
    } else if (prevOperand && currentOperand) {
      setOperation(operation);
      setPrevOperand(String(calculate(operation)));
      setCurrentOperand('');
    } else {
      setOperation(operation);
      setPrevOperand(currentOperand);
      setCurrentOperand('');
    }
  };

  const numberClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const value = String(e.currentTarget.getAttribute('value'));

    /**
     * When the first digit is '0', do not accept '0' as the input.
     * If another digit is entered, remove the leading '0'. */
    if (currentOperand.at(0) === '0' && value === '0') return;
    if (currentOperand.at(0) === '0' && value !== '0') {
      setCurrentOperand(value);
    } else if (calcDone) {
      /**
       * Automatically clear the currentOperand after all calculations have been performed.
       * For example, after reaching the state '1 + 1 = 2,' entering a new value,
       * such as '3,' will clear the previous '2' and replace it with '3.'
       */
      setCalcDone(false);
      setCurrentOperand(value);
    } else {
      setCurrentOperand(prev => prev + value);
    }
  };

  const operationHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedOperation = String(e.currentTarget.getAttribute('value'));

    operate(selectedOperation);
    if (prevOperand && !currentOperand) {
      setOperation(selectedOperation);
    } else if (prevOperand && currentOperand) {
      setOperation(selectedOperation);
      setPrevOperand(String(calculate(selectedOperation)));
      setCurrentOperand('');
    } else {
      setOperation(selectedOperation);
      setPrevOperand(currentOperand);
      setCurrentOperand('');
    }
  };

  const dotHandler = () => {
    if (currentOperand.includes('.')) return;

    currentOperand.length === 0
      ? setCurrentOperand('0.')
      : setCurrentOperand(prev => prev + '.');
  };

  const resetHandler = () => {
    setPrevOperand('');
    setCurrentOperand('');
    setOperation('');
    setCalcDone(false);
  };

  const backspaceHandler = () => {
    calcDone ? setCurrentOperand('') : setCurrentOperand(prev => prev.slice(0, -1));
  };

  const calculationHandler = () => {
    if (prevOperand && currentOperand && operation) {
      setCurrentOperand(String(calculate(operation)));
      setPrevOperand('');
      setOperation('');
      setCalcDone(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: globalThis.KeyboardEvent) => {
      if (NUMBERS.includes(+e.key) || OPERATIONS.includes(e.key) || ETC.includes(e.key)) {
        const button = document.querySelector(
          `button[value="${e.key}"]`
        ) as HTMLButtonElement;
        button.click();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div>
      <div>
        prev: {prevOperand} {operation}
      </div>
      <div>current: {currentOperand}</div>
      <div>calcDone: {String(calcDone)}</div>
      <div>
        {NUMBERS.map(num => (
          <button key={num} value={num} onClick={numberClickHandler}>
            {num}
          </button>
        ))}
        <button value="." onClick={dotHandler}>
          .
        </button>
        <button value="Backspace" onClick={backspaceHandler}>
          backspace
        </button>
        <button value="Escape" onClick={resetHandler}>
          reset
        </button>
        {OPERATIONS.map(operation => (
          <button key={operation} value={operation} onClick={operationHandler}>
            {operation}
          </button>
        ))}
        <button value="Enter" onClick={calculationHandler}>
          Calc
        </button>
      </div>
    </div>
  );
}

export default App;
