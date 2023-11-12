import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';
import Calculator from 'components/Calculator';
import Header from 'Layouts/Header';
import Main from 'Layouts/Main';
import Footer from 'Layouts/Footer';
import { themeType } from 'styles/constants';
import useTheme from 'hooks/useTheme';
import './index.css';

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeProvider theme={themeType[theme]}>
      <GlobalStyles />
      <section>
        <Header theme={theme} setTheme={setTheme} />
        <Main>
          <Calculator />
        </Main>
        <Footer />
      </section>
    </ThemeProvider>
  );
}

export default App;
