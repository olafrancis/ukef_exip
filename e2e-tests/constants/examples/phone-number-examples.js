export const INVALID_PHONE_NUMBERS = {
  MOBILE: {
    LONG: '079062089734',
    SPECIAL_CHAR: '07906208973*',
  },
  LANDLINE: {
    LONG: '020727180101',
    SHORT: '020894223',
    SPECIAL_CHAR: '0207257390*',
    LETTER: '0207257390L',
  },
  INTERNATIONAL: '0033144513100',
  INTERNATIONAL_PLUS: '+337906 208973',
  TOO_SHORT: '*44',
  ABOVE_MAX_CHARS: '1'.repeat(192),
};

export const VALID_PHONE_NUMBERS = {
  LANDLINE: {
    NORMAL: '02072718010',
    BRACKETS: '(0208) 742 5959',
    DASHES: '0208—742—5959',
    FULL_NO_ZEROS: '44(0)207 906 2089',
    FULL: '0044(0)207 906 2089',
  },
  MOBILE: {
    NORMAL: '07906208973',
    DASH: '07906-208973',
    FULL_CODE: '+447906 208973',
    FULL_CODE_BRACKET: '+44(0)7906 208973',
  },
};
