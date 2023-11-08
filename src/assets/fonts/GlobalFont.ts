import { createGlobalStyle } from 'styled-components';
import LeagueSpartan from './LeagueSpartan.ttf';

const GlobalFont = createGlobalStyle`
    @font-face {
        font-family: "LeagueSpartan";
        src: local("LeagueSpartan"), url(${LeagueSpartan}) format('truetype');
                font-style: normal;
    }
`;

export default GlobalFont;
