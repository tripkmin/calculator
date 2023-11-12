import { ThemeT } from 'types/type';

/**
 *
 * @param theme
 * @returns Changes the position of the theme selection switch.
 */
export const getDesktopTranslateXPosition = (theme: ThemeT) => {
  switch (theme) {
    case 'A':
      return '0px';
    case 'B':
      return '19.5px';
    case 'C':
      return '39px';
  }
};

export const getMobileTranslateXPosition = (theme: ThemeT) => {
  switch (theme) {
    case 'A':
      return '0px';
    case 'B':
      return '22px';
    case 'C':
      return '44px';
  }
};
/**
 *
 * @param length
 * @returns Used to reduce font size when the calculated number length becomes longer.
 */
export const getResizedFontSize = (length: number) => {
  if (length < 15) {
    return '2.5rem';
  } else if (length >= 15 && length < 20) {
    return '2.0rem';
  } else if (length >= 20 && length < 24) {
    return '1.8rem;';
  } else {
    return '1.6rem';
  }
};

/**
 *
 * @param numStr
 * @returns Converts "12,345,678" to "12345678" and returns it.
 */
export const ridComma = (numStr: string) => {
  return numStr.replaceAll(',', '');
};
