export const INVALID_POSTCODES = {
  ONE_LETTER_FIRST_PART: 'S 2AA',
  NO_LETTERS_FIRST_PART: '22 2AA',
  TWO_DIGITS_SECOND_PART: 'SW1 22A',
  THREE_DIGITS_SECOND_PART: 'SW1 222',
  ALL_LETTERS_SECOND_PART: 'SW1 AAA',
  TOO_MANY_CHARACTERS: 'SW1A 2HQA',
  TOO_FEW_CHARACTERS: 'S 2AA',
  TOO_MANY_CHARACTERS_WITHOUT_SPACE: 'SW1A2HQA',
  TOO_FEW_CHARACTERS_WITHOUT_SPACE: 'S2AA',
};

export const VALID_POSTCODES = {
  WITH_SPACE: 'SW1A 2HQ',
  WITHOUT_SPACE: 'SW1A2HQ',
};