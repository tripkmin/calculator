import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { ThemeT } from 'types/type';

const HeaderBox = styled.div`
  display: flex;
`;

const ThemeBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
`;

interface HeaderProps {
  setTheme: Dispatch<SetStateAction<ThemeT>>;
}
export default function Header({ setTheme }: HeaderProps) {
  return (
    <HeaderBox>
      <h1>calc</h1>
      <ThemeBox>
        <p></p>
        <div>
          <button
            onClick={() => {
              setTheme('A');
            }}>
            1
          </button>
          <button
            onClick={() => {
              setTheme('B');
            }}>
            2
          </button>
          <button
            onClick={() => {
              setTheme('C');
            }}>
            3
          </button>
        </div>
        <h6>THEME</h6>
        <div>
          <button
            onClick={() => {
              setTheme('A');
            }}>
            1
          </button>
          <button
            onClick={() => {
              setTheme('B');
            }}>
            2
          </button>
          <button
            onClick={() => {
              setTheme('C');
            }}>
            3
          </button>
        </div>
      </ThemeBox>
    </HeaderBox>
  );
}
