const {
  generateFieldGroups,
  generateSummaryListRows,
  generateSummaryList,
} = require('./generate-summary-list');
const { mapAnswersToContent } = require('./map-answers-to-content');
const {
  PAGES,
  FIELDS,
  LINKS,
} = require('../content-strings');
const {
  FIELD_GROUPS,
  FIELD_IDS,
  FIELD_VALUES,
  ROUTES,
} = require('../constants');
const { mockAnswers } = require('../test-mocks');

const {
  SINGLE_POLICY_TYPE,
  MULTI_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
  PRE_CREDIT_PERIOD,
} = FIELD_IDS;

describe('sever/helpers/generate-summary-list', () => {
  const mockFields = [
    {
      ID: FIELD_IDS.VALID_COMPANY_BASE,
      ...FIELDS[FIELD_IDS.VALID_COMPANY_BASE],
      CHANGE_ROUTE: ROUTES.COMPANY_BASED_CHANGE,
    },
  ];

  describe('generateFieldGroups', () => {
    it('should map over each field group with value from submittedData', () => {
      const mockAnswersContent = mapAnswersToContent(mockAnswers);
      delete mockAnswersContent[SINGLE_POLICY_TYPE];
      delete mockAnswersContent[SINGLE_POLICY_LENGTH];
      delete mockAnswersContent[PRE_CREDIT_PERIOD];

      const result = generateFieldGroups(mockAnswersContent);
      const fieldGroups = FIELD_GROUPS;

      const expected = {
        COMPANY_DETAILS: fieldGroups.COMPANY_DETAILS.map((field) => ({
          ...field,
          value: {
            text: mockAnswersContent[field.ID].text,
          },
        })),
        EXPORT_DETAILS: fieldGroups.EXPORT_DETAILS.map((field) => ({
          ...field,
          value: {
            text: mockAnswersContent[field.ID].text,
          },
        })),
        DEAL_DETAILS: fieldGroups.DEAL_DETAILS.map((field) => ({
          ...field,
          value: {
            text: mockAnswersContent[field.ID].text,
          },
        })),
      };

      expect(result).toEqual(expected);
    });

    describe('when policy type is single', () => {
      it(`should add a ${SINGLE_POLICY_TYPE} object to DEAL_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockAnswers),
          [SINGLE_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.SINGLE,
          },
        };

        delete mockAnswersContent[PRE_CREDIT_PERIOD];

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.DEAL_DETAILS[result.DEAL_DETAILS.length - 2];

        const expected = {
          ID: SINGLE_POLICY_TYPE,
          ...FIELDS[SINGLE_POLICY_TYPE],
          CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
          value: {
            text: mockAnswersContent[SINGLE_POLICY_TYPE].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add a ${SINGLE_POLICY_LENGTH} object to DEAL_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockAnswers),
          ...mockAnswers,
          [SINGLE_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.SINGLE,
          },
        };

        delete mockAnswersContent[PRE_CREDIT_PERIOD];

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.DEAL_DETAILS[result.DEAL_DETAILS.length - 1];

        const expected = {
          ID: SINGLE_POLICY_LENGTH,
          ...FIELDS[SINGLE_POLICY_LENGTH],
          CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
          value: {
            text: mockAnswersContent[SINGLE_POLICY_LENGTH].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });
    });

    describe('when policy type is multi', () => {
      it(`should add a ${MULTI_POLICY_TYPE} object to DEAL_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockAnswers),
          [MULTI_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.MULTI,
          },
          [MULTI_POLICY_LENGTH]: {
            text: 2,
          },
        };

        delete mockAnswersContent[SINGLE_POLICY_TYPE];
        delete mockAnswersContent[PRE_CREDIT_PERIOD];

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.DEAL_DETAILS[result.DEAL_DETAILS.length - 2];

        const expected = {
          ID: MULTI_POLICY_TYPE,
          ...FIELDS[MULTI_POLICY_TYPE],
          CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
          value: {
            text: mockAnswersContent[MULTI_POLICY_TYPE].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add a ${MULTI_POLICY_LENGTH} object to DEAL_DETAILS with single policy length field values`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockAnswers),
          [MULTI_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.MULTI,
          },
          [MULTI_POLICY_LENGTH]: {
            text: 2,
          },
        };

        delete mockAnswersContent[SINGLE_POLICY_TYPE];
        delete mockAnswersContent[PRE_CREDIT_PERIOD];

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.DEAL_DETAILS[result.DEAL_DETAILS.length - 1];

        const expected = {
          ID: MULTI_POLICY_LENGTH,
          ...FIELDS[MULTI_POLICY_LENGTH],
          CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
          value: {
            text: mockAnswersContent[MULTI_POLICY_LENGTH].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });
    });

    describe(`when ${PRE_CREDIT_PERIOD} is in submittedData`, () => {
      it(`should add a ${PRE_CREDIT_PERIOD} object to DEAL_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockAnswers),
          [PRE_CREDIT_PERIOD]: {
            text: 1,
          },
        };

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.DEAL_DETAILS[result.DEAL_DETAILS.length - 1];

        const expected = {
          ID: PRE_CREDIT_PERIOD,
          ...FIELDS[PRE_CREDIT_PERIOD],
          CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
          value: {
            text: mockAnswersContent[PRE_CREDIT_PERIOD].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });
    });
  });

  describe('generateSummaryListRows', () => {
    it('returns an array of objects mapped to submitted data', () => {
      const fieldGroups = generateFieldGroups(mockAnswers);

      const result = generateSummaryListRows(
        fieldGroups.COMPANY_DETAILS,
        mockAnswers,
      );

      const expectedObj = (field) => ({
        key: {
          text: FIELDS[field.ID].SUMMARY.TITLE,
          classes: `${field.ID}-key`,
        },
        value: {
          text: mockAnswers[field.ID].text,
          classes: `${field.ID}-value`,
        },
        actions: {
          items: [
            {
              href: `${field.CHANGE_ROUTE}#${field.ID}`,
              text: LINKS.CHANGE,
              visuallyHiddenText: FIELDS[field.ID].SUMMARY.TITLE,
              attributes: {
                'data-cy': `${field.ID}-change-link`,
              },
            },
          ],
        },
      });

      expect(result).toBeInstanceOf(Array);

      const expected = expectedObj(mockFields[0]);
      expect(result[0]).toEqual(expected);
    });
  });

  describe('generateSummaryList', () => {
    it('should return an object with multiple summary lists', () => {
      const mockAnswersContent = mapAnswersToContent(mockAnswers);

      const fieldGroups = generateFieldGroups(mockAnswersContent);

      const result = generateSummaryList(mockAnswersContent);

      const expected = {
        COMPANY: {
          GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_COMPANY,
          ROWS: generateSummaryListRows(fieldGroups.COMPANY_DETAILS, mockAnswers),
        },
        EXPORT: {
          GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_EXPORT,
          ROWS: generateSummaryListRows(fieldGroups.EXPORT_DETAILS, mockAnswers),
        },
        DEAL: {
          GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_DEAL,
          ROWS: generateSummaryListRows(fieldGroups.DEAL_DETAILS, mockAnswers),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
