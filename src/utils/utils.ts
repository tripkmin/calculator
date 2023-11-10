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

export const getResizedFontSize = (length: number) => {
  if (length < 15) {
    return '2.5rem';
  } else if (length >= 15 && length < 20) {
    return '2.0rem';
  } else {
    return '1.6rem;';
  }
};
