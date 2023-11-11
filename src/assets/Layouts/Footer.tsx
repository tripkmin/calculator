import githubIcon from 'assets/images/github.png';
import frontendMentorIcon from 'assets/images/frontendMentor.png';
import styled from 'styled-components';
import { timer } from 'styles/constants';

const FooterLayout = styled.footer`
  margin-top: 1.2rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.4rem;
`;
const Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 50%;
  background-color: ${props => props.theme.buttonTypeB};
  transition: all ${timer.default};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.buttonHoverTypeB};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default function Footer() {
  return (
    <FooterLayout>
      <Link
        href="https://github.com/tripkmin/calculator"
        target="_blank"
        title="tripkmin github">
        <img width={16} src={githubIcon}></img>
      </Link>
      <Link
        href="https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29"
        target="_blank"
        title="frontend mentor">
        <img width={16} src={frontendMentorIcon}></img>
      </Link>
    </FooterLayout>
  );
}
