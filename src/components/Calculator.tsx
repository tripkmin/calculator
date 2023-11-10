import { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

const CalculatorLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25%, auto));
`;

const CalcElement = styled.button`
  &:nth-child(17),
  &:nth-child(18) {
    grid-column: span 2;
  }
`;

export default function Calculator() {
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
      <CalculatorLayout>
        <CalcElement value="7" onClick={numberClickHandler}>
          7
        </CalcElement>
        <CalcElement value="8" onClick={numberClickHandler}>
          8
        </CalcElement>
        <CalcElement value="9" onClick={numberClickHandler}>
          9
        </CalcElement>
        <CalcElement value="Backspace" onClick={backspaceHandler}>
          DEL
        </CalcElement>
        <CalcElement value="4" onClick={numberClickHandler}>
          4
        </CalcElement>
        <CalcElement value="5" onClick={numberClickHandler}>
          5
        </CalcElement>
        <CalcElement value="6" onClick={numberClickHandler}>
          6
        </CalcElement>
        <CalcElement value="+" onClick={operationHandler}>
          +
        </CalcElement>
        <CalcElement value="1" onClick={numberClickHandler}>
          1
        </CalcElement>
        <CalcElement value="2" onClick={numberClickHandler}>
          2
        </CalcElement>
        <CalcElement value="3" onClick={numberClickHandler}>
          3
        </CalcElement>
        <CalcElement value="-" onClick={operationHandler}>
          -
        </CalcElement>
        <CalcElement value="." onClick={dotHandler}>
          .
        </CalcElement>
        <CalcElement value="0" onClick={numberClickHandler}>
          0
        </CalcElement>
        <CalcElement value="/" onClick={operationHandler}>
          /
        </CalcElement>
        <CalcElement value="*" onClick={operationHandler}>
          *
        </CalcElement>
        <CalcElement value="Escape" onClick={resetHandler}>
          RESET
        </CalcElement>
        <CalcElement value="Enter" onClick={calculationHandler}>
          =
        </CalcElement>
      </CalculatorLayout>
    </div>
  );
}
