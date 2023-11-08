import { MouseEvent, useState } from 'react';

function App() {
  const [prevOperand, setPrevOperand] = useState('');
  const [currentOperand, setCurrentOperand] = useState('');
  const [operation, setOperation] = useState('');
  const [calcDone, setCalcDone] = useState(false);

  const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const OPS_LIST = ['+', '-', '*', '/'];

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

  const numberClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const value = String(e.currentTarget.getAttribute('data-value'));

    /**
     * Automatically clear the currentOperand after all calculations have been performed.
     * For example, after reaching the state '1 + 1 = 2,' entering a new value,
     * such as '3,' will clear the previous '2' and replace it with '3.'
     */
    if (calcDone) {
      setCalcDone(false);
      setCurrentOperand(value);
    } else {
      setCurrentOperand(prev => prev + value);
    }
  };

  const operationHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedOperation = String(e.currentTarget.getAttribute('data-operation'));

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

  const addDotHandler = () => {
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

  return (
    <div>
      <div>
        prev: {prevOperand} {operation}
      </div>
      <div>current: {currentOperand}</div>
      <div>
        {NUMBERS.map(num => (
          <button key={num} data-value={num} onClick={numberClickHandler}>
            {num}
          </button>
        ))}
        <button onClick={addDotHandler}>.</button>
        <button onClick={backspaceHandler}>backspace</button>
        <button onClick={resetHandler}>reset</button>
        {OPS_LIST.map(operation => (
          <button key={operation} data-operation={operation} onClick={operationHandler}>
            {operation}
          </button>
        ))}
        <button data-operation={operation} onClick={calculationHandler}>
          Calc
        </button>
      </div>
    </div>
  );
}

export default App;
