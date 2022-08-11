import { generateFieldGroups, getKeyText, generateSummaryListRows, answersSummaryList } from './answers-summary-list';
import { mapAnswersToContent } from '../data-content-mappings/map-answers-to-content';
import { FIELDS, LINKS, PAGES } from '../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../constants';
import { mockSession } from '../../test-mocks';
import { SummaryListItemData } from '../../../types';

const {
  BUYER_COUNTRY,
  CONTRACT_VALUE,
  CREDIT_PERIOD,
  MAX_AMOUNT_OWED,
  MULTI_POLICY_LENGTH,
  MULTI_POLICY_TYPE,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  SINGLE_POLICY_TYPE,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_COMPANY_BASE,
} = FIELD_IDS;

describe('server/helpers/summary-lists/answers-summary-list', () => {
  describe('generateFieldGroups - no policy type', () => {
    it('should map over each field group with value from submittedData', () => {
      const mockAnswersContent = mapAnswersToContent(mockSession.submittedData);
      delete mockAnswersContent[SINGLE_POLICY_TYPE];
      delete mockAnswersContent[SINGLE_POLICY_LENGTH];

      const result = generateFieldGroups(mockAnswersContent);

      const expected = {
        EXPORT_DETAILS: [
          {
            id: BUYER_COUNTRY,
            ...FIELDS[BUYER_COUNTRY],
            href: `${ROUTES.BUYER_COUNTRY_CHANGE}#heading`,
            value: {
              text: mockAnswersContent[BUYER_COUNTRY].text,
            },
          },
          {
            id: VALID_COMPANY_BASE,
            ...FIELDS[VALID_COMPANY_BASE],
            href: `${ROUTES.COMPANY_BASED_CHANGE}#heading`,
            value: {
              text: mockAnswersContent[VALID_COMPANY_BASE].text,
            },
          },
          {
            id: HAS_MINIMUM_UK_GOODS_OR_SERVICES,
            ...FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES],
            href: `${ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE}#heading`,
            value: {
              text: mockAnswersContent[HAS_MINIMUM_UK_GOODS_OR_SERVICES].text,
            },
          },
        ],
        POLICY_DETAILS: [],
      };

      expect(result).toEqual(expected);
    });

    describe('when policy type is single', () => {
      it(`should add a ${SINGLE_POLICY_TYPE} object to POLICY_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent({
            ...mockSession.submittedData,
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          }),
        };

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[0];

        const expected = {
          id: SINGLE_POLICY_TYPE,
          ...FIELDS[SINGLE_POLICY_TYPE],
          href: `${ROUTES.POLICY_TYPE_CHANGE}#heading`,
          value: {
            text: mockAnswersContent[SINGLE_POLICY_TYPE].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add a ${SINGLE_POLICY_LENGTH} object to POLICY_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockSession.submittedData),
          [SINGLE_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.SINGLE,
          },
        };

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[1];

        const expected = {
          id: SINGLE_POLICY_LENGTH,
          ...FIELDS[SINGLE_POLICY_LENGTH],
          href: `${ROUTES.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`,
          value: {
            text: mockAnswersContent[SINGLE_POLICY_LENGTH].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add ${CONTRACT_VALUE} object to POLICY_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockSession.submittedData),
          [SINGLE_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.SINGLE,
          },
        };

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[result.POLICY_DETAILS.length - 2];

        const expected = {
          id: CONTRACT_VALUE,
          ...FIELDS[CONTRACT_VALUE],
          href: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`,
          value: {
            text: mockAnswersContent[CONTRACT_VALUE].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add ${PERCENTAGE_OF_COVER} object to POLICY_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockSession.submittedData),
          [SINGLE_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.SINGLE,
          },
        };

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[result.POLICY_DETAILS.length - 1];

        const expected = {
          id: PERCENTAGE_OF_COVER,
          ...FIELDS[PERCENTAGE_OF_COVER],
          href: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
          value: {
            text: mockAnswersContent[PERCENTAGE_OF_COVER].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });
    });

    describe('when policy type is multi', () => {
      let mockAnswersContent: object;

      beforeEach(() => {
        mockAnswersContent = {
          ...mapAnswersToContent(mockSession.submittedData),
          [MULTI_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.MULTI,
          },
          [MULTI_POLICY_LENGTH]: {
            text: 2,
          },
          [MAX_AMOUNT_OWED]: {
            text: '£12,345',
          },
        };

        delete mockAnswersContent[SINGLE_POLICY_TYPE];
      });

      it(`should add a ${MULTI_POLICY_TYPE} object to POLICY_DETAILS`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[0];

        const expected = {
          id: MULTI_POLICY_TYPE,
          ...FIELDS[MULTI_POLICY_TYPE],
          href: `${ROUTES.POLICY_TYPE_CHANGE}#heading`,
          value: {
            text: mockAnswersContent[MULTI_POLICY_TYPE].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add a ${MULTI_POLICY_LENGTH} object to POLICY_DETAILS with single policy length field values`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[1];

        const expected = {
          id: MULTI_POLICY_LENGTH,
          ...FIELDS[MULTI_POLICY_LENGTH],
          href: `${ROUTES.POLICY_TYPE_CHANGE}#${MULTI_POLICY_LENGTH}-label`,
          value: {
            text: mockAnswersContent[MULTI_POLICY_LENGTH].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add ${MAX_AMOUNT_OWED} object to POLICY_DETAILS`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[2];

        const expected = {
          id: MAX_AMOUNT_OWED,
          ...FIELDS[MAX_AMOUNT_OWED],
          href: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`,
          value: {
            text: mockAnswersContent[MAX_AMOUNT_OWED].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add ${PERCENTAGE_OF_COVER} object to POLICY_DETAILS`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[3];

        const expected = {
          id: PERCENTAGE_OF_COVER,
          ...FIELDS[PERCENTAGE_OF_COVER],
          href: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
          value: {
            text: mockAnswersContent[PERCENTAGE_OF_COVER].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add ${CREDIT_PERIOD} object to POLICY_DETAILS`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[4];

        const expected = {
          id: CREDIT_PERIOD,
          ...FIELDS[CREDIT_PERIOD],
          href: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CREDIT_PERIOD}-label`,
          value: {
            text: mockAnswersContent[CREDIT_PERIOD].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });
    });
  });

  describe('getKeyText', () => {
    describe('when a field has SUMMARY objct', () => {
      const fieldId = VALID_COMPANY_BASE;

      it('should return FIELD.SUMMARY.TITLE', () => {
        const result = getKeyText(fieldId);

        const expected = FIELDS[VALID_COMPANY_BASE].SUMMARY?.TITLE;
        expect(result).toEqual(expected);
      });
    });
  });

  describe('generateSummaryListRows', () => {
    it('returns an array of objects mapped to submitted data', () => {
      const mockAnswersContent = mapAnswersToContent(mockSession.submittedData);
      const fieldGroups = generateFieldGroups(mockAnswersContent);

      const result = generateSummaryListRows(fieldGroups.EXPORT_DETAILS);

      const expectedObj = (field: SummaryListItemData) => ({
        key: {
          text: getKeyText(field.id),
          classes: `${field.id}-key`,
        },
        value: {
          text: field.value.text,
          classes: `${field.id}-value`,
        },
        actions: {
          items: [
            {
              href: field.href,
              text: LINKS.CHANGE,
              visuallyHiddenText: getKeyText(field.id),
              attributes: {
                'data-cy': `${field.id}-change-link`,
              },
            },
          ],
        },
      });

      expect(result).toBeInstanceOf(Array);

      const expected = expectedObj(fieldGroups.EXPORT_DETAILS[0]);
      expect(result[0]).toEqual(expected);
    });
  });

  describe('answersSummaryList', () => {
    it('should return an object with multiple summary lists', () => {
      const mockAnswersContent = mapAnswersToContent(mockSession.submittedData);

      const fieldGroups = generateFieldGroups(mockAnswersContent);

      const result = answersSummaryList(mockAnswersContent);

      const expected = {
        EXPORT: {
          GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_EXPORT,
          ROWS: generateSummaryListRows(fieldGroups.EXPORT_DETAILS),
        },
        POLICY: {
          GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_POLICY,
          ROWS: generateSummaryListRows(fieldGroups.POLICY_DETAILS),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});