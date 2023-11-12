import githubIcon from 'assets/images/github.png';
import frontendMentorIcon from 'assets/images/frontendMentor.png';
import styled from 'styled-components';
import { size, timer } from 'styles/constants';

const FooterLayout = styled.footer`
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
`;

const Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 50%;
  background-color: ${props => props.theme.buttonTypeB};
  transition: all ${timer.default};
  cursor: pointer;

  @media screen and (max-width: ${size.mobile}) {
    padding: 10px;
  }

  &:hover {
    background-color: ${props => props.theme.buttonHoverTypeB};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Icon = styled.img`
  width: 16px;

  @media screen and (max-width: ${size.mobile}) {
    width: 24px;
  }
`;

export default function Footer() {
  return (
    <FooterLayout>
      <Link
        href="https://github.com/tripkmin/calculator"
        target="_blank"
        title="tripkmin github">
        <Icon src={githubIcon}></Icon>
      </Link>
      <Link
        href="https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29"
        target="_blank"
        title="frontend mentor">
        <Icon src={frontendMentorIcon}></Icon>
      </Link>
    </FooterLayout>
  );
}
