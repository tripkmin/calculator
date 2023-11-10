import { ThemeT } from 'types/type';

export const getTranslateXPosition = (theme: ThemeT) => {
  switch (theme) {
    case 'A':
      return '0px';
    case 'B':
      return '18.5px';
    case 'C':
      return '39px';
  }
};
