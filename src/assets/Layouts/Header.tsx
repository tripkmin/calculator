import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import { ThemeOption, ThemeT } from 'types/type';
import { getTranslateXPosition } from 'utils/utils';

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.fontColorTypeA};
`;

const Head = styled.h1`
  font-size: 2%.1;
  font-weight: 700;
`;

const SubHead = styled.h6`
  font-weight: 700;
`;

const ThemeBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  align-items: center;
  color: ${props => props.theme.fontColorTypeA};
`;

const ThemeIndicator = styled.button`
  color: ${props => props.theme.fontColorTypeA};
`;
const SwtichBox = styled.div<{ $theme: ThemeT }>`
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.subBackgroundB};
  border-radius: 10px;
  padding: 4px 5px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 6px;
    left: 8px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.theme.buttonTypeC};
    transform: ${props => `translateX(${getTranslateXPosition(props.$theme)})`};
    transition: transform 0.2s;
  }
`;

const Switch = styled.button`
  color: ${props => props.theme.subBackgroundB};
`;

interface HeaderProps {
  theme: ThemeT;
  setTheme: Dispatch<SetStateAction<ThemeT>>;
}

export default function Header({ theme, setTheme }: HeaderProps) {
  const themeArr: ThemeOption[] = [
    ['A', 1],
    ['B', 2],
    ['C', 3],
  ];

  return (
    <HeaderBox>
      <Head>calc</Head>
      <ThemeBox>
        <p></p>
        <div>
          {themeArr.map(el => (
            <ThemeIndicator
              onClick={() => {
                setTheme(el[0]);
              }}>
              {el[1]}
            </ThemeIndicator>
          ))}
        </div>
        <SubHead>THEME</SubHead>
        <SwtichBox $theme={theme}>
          {themeArr.map(el => (
            <Switch
              onClick={() => {
                setTheme(el[0]);
              }}>
              {el[1]}
            </Switch>
          ))}
        </SwtichBox>
      </ThemeBox>
    </HeaderBox>
  );
}
