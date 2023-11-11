import { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { timer } from 'styles/constants';
import { ridComma, getResizedFontSize } from 'utils/utils';

const ResultLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  height: 6rem;
  margin: 1.2rem 0;
  padding: 1rem 1.2rem;
  background-color: ${props => props.theme.subBackgroundA};
  border-radius: 0.6rem;
  color: ${props => props.theme.fontColorTypeA};
  transition: transform ${timer.default}, background-color ${timer.default},
    color ${timer.default};
`;

const HistoryBox = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const ResultBox = styled.div<{ $length: number }>`
  flex-grow: 1;
  font-size: ${props => getResizedFontSize(props.$length)};
  font-weight: 700;
  display: flex;
  align-items: center;

  & p {
    font-size: inherit;
  }
`;

const CalcBtnLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: ${props => props.theme.subBackgroundB};
  transition: background-color ${timer.default};
  border-radius: 0.6rem;
  padding: 1.4rem;
  grid-gap: 1rem;
`;

const CalcElement = styled.button`
  background-color: ${props => props.theme.buttonTypeA};
  padding: 0.8rem 1.2rem;
  border-radius: 0.6rem;
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.fontColorTypeB};
  border-bottom: 2px solid ${props => props.theme.buttonBorderTypeA};
  transition: color ${timer.default}, background-color ${timer.default},
    border-bottom ${timer.default}, transform ${timer.fast};

  &:hover {
    background-color: ${props => props.theme.buttonHoverTypeA};
  }

  &:active {
    transform: translateY(1px);
  }

  &:nth-child(4),
  &:nth-child(17) {
    color: ${props => props.theme.fontColorTypeC};
    background-color: ${props => props.theme.buttonTypeB};
    font-size: 1.4rem;
    border-bottom: 2px solid ${props => props.theme.buttonBorderTypeB};
    &:hover {
      background-color: ${props => props.theme.buttonHoverTypeB};
    }
  }

  &:nth-child(18) {
    color: ${props => props.theme.fontColorTypeD};
    background-color: ${props => props.theme.buttonTypeC};
    font-size: 1.4rem;
    border-bottom: 2px solid ${props => props.theme.buttonBorderTypeC};
    &:hover {
      background-color: ${props => props.theme.buttonHoverTypeC};
    }
  }

  &:nth-child(17),
  &:nth-child(18) {
    grid-column: span 2;
    padding: 1.1rem;
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
    const [prev, current] = [ridComma(prevOperand), ridComma(currentOperand)];

    switch (operation) {
      case '+':
        return parseFloat(prev) + parseFloat(current);
      case '-':
        return parseFloat(prev) - parseFloat(current);
      case '*':
        return parseFloat(prev) * parseFloat(current);
      case '/':
        return parseFloat(prev) / parseFloat(current);
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
      setCurrentOperand(prev => {
        if (prev.length <= 16) {
          return Number(ridComma(prev) + value).toLocaleString();
        } else {
          return prev;
        }
      });
    }
  };

  const operationHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedOperation = String(e.currentTarget.getAttribute('value'));
    if (selectedOperation === '-' && currentOperand === '-') return;

    if (selectedOperation === '-' && !prevOperand && !currentOperand) {
      setCurrentOperand(prev => '-' + prev);
    } else if (prevOperand && !currentOperand) {
      setOperation(selectedOperation);
    } else if (prevOperand && currentOperand) {
      setOperation(selectedOperation);
      setPrevOperand(_ => {
        const result = calculate(selectedOperation);
        if (String(result).length <= 19) {
          return String(result?.toLocaleString());
        } else {
          return String(result);
        }
      });
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
    calcDone
      ? setCurrentOperand('')
      : setCurrentOperand(prev => Number(ridComma(prev).slice(0, -1)).toLocaleString());
  };

  const calculationHandler = () => {
    if (prevOperand && currentOperand && operation) {
      setCurrentOperand(_ => {
        const result = calculate(operation);
        if (String(result).length <= 19) {
          return String(result?.toLocaleString());
        } else {
          return String(result);
        }
      });
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
      <ResultLayout>
        <HistoryBox>
          {prevOperand} {operation}
        </HistoryBox>
        <ResultBox $length={currentOperand.length}>
          <p>{currentOperand}</p>
        </ResultBox>
      </ResultLayout>
      <CalcBtnLayout>
        <CalcElement tabIndex={-1} value="7" onClick={numberClickHandler}>
          7
        </CalcElement>
        <CalcElement tabIndex={-1} value="8" onClick={numberClickHandler}>
          8
        </CalcElement>
        <CalcElement tabIndex={-1} value="9" onClick={numberClickHandler}>
          9
        </CalcElement>
        <CalcElement tabIndex={-1} value="Backspace" onClick={backspaceHandler}>
          DEL
        </CalcElement>
        <CalcElement tabIndex={-1} value="4" onClick={numberClickHandler}>
          4
        </CalcElement>
        <CalcElement tabIndex={-1} value="5" onClick={numberClickHandler}>
          5
        </CalcElement>
        <CalcElement tabIndex={-1} value="6" onClick={numberClickHandler}>
          6
        </CalcElement>
        <CalcElement tabIndex={-1} value="+" onClick={operationHandler}>
          +
        </CalcElement>
        <CalcElement tabIndex={-1} value="1" onClick={numberClickHandler}>
          1
        </CalcElement>
        <CalcElement tabIndex={-1} value="2" onClick={numberClickHandler}>
          2
        </CalcElement>
        <CalcElement tabIndex={-1} value="3" onClick={numberClickHandler}>
          3
        </CalcElement>
        <CalcElement tabIndex={-1} value="-" onClick={operationHandler}>
          -
        </CalcElement>
        <CalcElement tabIndex={-1} value="." onClick={dotHandler}>
          .
        </CalcElement>
        <CalcElement tabIndex={-1} value="0" onClick={numberClickHandler}>
          0
        </CalcElement>
        <CalcElement tabIndex={-1} value="/" onClick={operationHandler}>
          /
        </CalcElement>
        <CalcElement tabIndex={-1} value="*" onClick={operationHandler}>
          *
        </CalcElement>
        <CalcElement tabIndex={-1} value="Escape" onClick={resetHandler}>
          RESET
        </CalcElement>
        <CalcElement tabIndex={-1} value="Enter" onClick={calculationHandler}>
          =
        </CalcElement>
      </CalcBtnLayout>
    </div>
  );
}
