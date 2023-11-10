import { ThemeProvider } from 'styled-components';
import GlobalFont from 'assets/fonts/GlobalFont';
import GlobalStyles from 'styles/GlobalStyles';
import Calculator from 'components/Calculator';
import Header from 'assets/Layouts/Header';
import Main from 'assets/Layouts/Main';
import { themeType } from 'styles/constants';
import useTheme from 'hooks/useTheme';

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeProvider theme={themeType[theme]}>
      <GlobalFont />
      <GlobalStyles />
      <section>
        <Header setTheme={setTheme} />
        <Main>
          <Calculator />
        </Main>
      </section>
    </ThemeProvider>
  );
}

export default App;
