const {
  generateFieldGroups,
  getKeyText,
  generateSummaryListRows,
  generateSummaryList,
} = require('./generate-summary-list');
const { mapAnswersToContent } = require('./data-content-mappings/map-answers-to-content');
const {
  PAGES,
  FIELDS,
  LINKS,
} = require('../content-strings');
const {
  FIELD_IDS,
  FIELD_VALUES,
  ROUTES,
} = require('../constants');
const { mockSession } = require('../test-mocks');

const {
  AMOUNT,
  BUYER_COUNTRY,
  CREDIT_PERIOD,
  MULTI_POLICY_LENGTH,
  MULTI_POLICY_TYPE,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  SINGLE_POLICY_TYPE,
  UK_GOODS_OR_SERVICES,
  VALID_COMPANY_BASE,
} = FIELD_IDS;

describe('server/helpers/generate-summary-list', () => {
  describe('generateFieldGroups - no policy type', () => {
    it('should map over each field group with value from submittedData', () => {
      const mockAnswersContent = mapAnswersToContent(mockSession.submittedData);
      delete mockAnswersContent[SINGLE_POLICY_TYPE];
      delete mockAnswersContent[SINGLE_POLICY_LENGTH];

      const result = generateFieldGroups(mockAnswersContent);

      const expected = {
        EXPORT_DETAILS: [
          {
            ID: BUYER_COUNTRY,
            ...FIELDS[BUYER_COUNTRY],
            CHANGE_ROUTE: ROUTES.BUYER_COUNTRY_CHANGE,
            value: {
              text: mockAnswersContent[BUYER_COUNTRY].text,
            },
          },
          {
            ID: VALID_COMPANY_BASE,
            ...FIELDS[VALID_COMPANY_BASE],
            CHANGE_ROUTE: ROUTES.COMPANY_BASED_CHANGE,
            value: {
              text: mockAnswersContent[VALID_COMPANY_BASE].text,
            },
          },
        ],
      };

      // the following fields are dynamically added after previous fields.
      expected.EXPORT_DETAILS = [
        ...expected.EXPORT_DETAILS,
        {
          ID: UK_GOODS_OR_SERVICES,
          ...FIELDS[UK_GOODS_OR_SERVICES],
          CHANGE_ROUTE: ROUTES.UK_GOODS_OR_SERVICES_CHANGE,
          value: {
            text: mockAnswersContent[UK_GOODS_OR_SERVICES].text,
          },
        },
      ];

      expected.POLICY_DETAILS = [
        {
          ID: AMOUNT,
          ...FIELDS[AMOUNT],
          CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE,
          value: {
            text: mockAnswersContent[AMOUNT].text,
          },
        },
        {
          ID: PERCENTAGE_OF_COVER,
          ...FIELDS[PERCENTAGE_OF_COVER],
          CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE,
          value: {
            text: mockAnswersContent[PERCENTAGE_OF_COVER].text,
          },
        },
      ];

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
          ID: SINGLE_POLICY_TYPE,
          ...FIELDS[SINGLE_POLICY_TYPE],
          CHANGE_ROUTE: ROUTES.POLICY_TYPE_CHANGE,
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
          ID: SINGLE_POLICY_LENGTH,
          ...FIELDS[SINGLE_POLICY_LENGTH],
          CHANGE_ROUTE: ROUTES.POLICY_TYPE_CHANGE,
          value: {
            text: mockAnswersContent[SINGLE_POLICY_LENGTH].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });
    });

    describe('when policy type is multi', () => {
      let mockAnswersContent;

      beforeEach(() => {
        mockAnswersContent = {
          ...mapAnswersToContent(mockSession.submittedData),
          [MULTI_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.MULTI,
          },
          [MULTI_POLICY_LENGTH]: {
            text: 2,
          },
        };

        delete mockAnswersContent[SINGLE_POLICY_TYPE];
      });

      it(`should add a ${MULTI_POLICY_TYPE} object to POLICY_DETAILS`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[0];

        const expected = {
          ID: MULTI_POLICY_TYPE,
          ...FIELDS[MULTI_POLICY_TYPE],
          CHANGE_ROUTE: ROUTES.POLICY_TYPE_CHANGE,
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
          ID: MULTI_POLICY_LENGTH,
          ...FIELDS[MULTI_POLICY_LENGTH],
          CHANGE_ROUTE: ROUTES.POLICY_TYPE_CHANGE,
          value: {
            text: mockAnswersContent[MULTI_POLICY_LENGTH].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add ${CREDIT_PERIOD} object to POLICY_DETAILS`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[result.POLICY_DETAILS.length - 2];

        const expected = {
          ID: CREDIT_PERIOD,
          ...FIELDS[CREDIT_PERIOD],
          CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE,
          value: {
            text: mockAnswersContent[CREDIT_PERIOD].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });
    });
  });

  describe('getKeyText', () => {
    describe('when a field has SINGLE_POLICY and MULTI_POLICY objects with SUMMARY objct', () => {
      const fieldId = AMOUNT;

      describe('when policy type is single', () => {
        it('should return FIELD.SINGLE_POLICY.SUMMARY.TITLE', () => {
          const result = getKeyText(fieldId, FIELD_VALUES.POLICY_TYPE.SINGLE);

          const expected = FIELDS[AMOUNT].SINGLE_POLICY.SUMMARY.TITLE;
          expect(result).toEqual(expected);
        });
      });

      describe('when policy type is multi', () => {
        it('should return FIELD.MULTI_POLICY.SUMMARY.TITLE', () => {
          const result = getKeyText(fieldId, FIELD_VALUES.POLICY_TYPE.MULTI);

          const expected = FIELDS[AMOUNT].MULTI_POLICY.SUMMARY.TITLE;
          expect(result).toEqual(expected);
        });
      });
    });

    describe('when a field has SINGLE_POLICY and MULTI_POLICY objects but does NOT have SUMMARY object', () => {
      const fieldId = BUYER_COUNTRY;

      describe('when policy type is single', () => {
        it('should return FIELD.SUMMARY.TITLE', () => {
          const result = getKeyText(fieldId, FIELD_VALUES.POLICY_TYPE.SINGLE);

          const expected = FIELDS[BUYER_COUNTRY].SUMMARY.TITLE;
          expect(result).toEqual(expected);
        });
      });

      describe('when policy type is multi', () => {
        it('should return FIELD.SUMMARY.TITLE', () => {
          const result = getKeyText(fieldId, FIELD_VALUES.POLICY_TYPE.MULTI);

          const expected = FIELDS[BUYER_COUNTRY].SUMMARY.TITLE;
          expect(result).toEqual(expected);
        });
      });
    });

    describe('when a field does NOT have SINGLE_POLICY and MULTI_POLICY objects', () => {
      const fieldId = CREDIT_PERIOD;

      it('should return FIELD.SUMMARY.TITLE', () => {
        const result = getKeyText(fieldId, FIELD_VALUES.POLICY_TYPE.MULTI);

        const expected = FIELDS[CREDIT_PERIOD].SUMMARY.TITLE;
        expect(result).toEqual(expected);
      });
    });
  });

  describe('generateSummaryListRows', () => {
    it('returns an array of objects mapped to submitted data', () => {
      const mockAnswersContent = mapAnswersToContent(mockSession.submittedData);
      const fieldGroups = generateFieldGroups(mockAnswersContent);

      const result = generateSummaryListRows(
        fieldGroups.EXPORT_DETAILS,
        mockSession.submittedData[POLICY_TYPE],
      );

      const expectedObj = (field) => ({
        key: {
          text: getKeyText(field.ID, mockSession.submittedData[POLICY_TYPE]),
          classes: `${field.ID}-key`,
        },
        value: {
          text: field.value.text,
          classes: `${field.ID}-value`,
        },
        actions: {
          items: [
            {
              href: `${field.CHANGE_ROUTE}#${field.ID}`,
              text: LINKS.CHANGE,
              visuallyHiddenText: getKeyText(field.ID, mockSession.submittedData[POLICY_TYPE]),
              attributes: {
                'data-cy': `${field.ID}-change-link`,
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

  describe('generateSummaryList', () => {
    it('should return an object with multiple summary lists', () => {
      const mockAnswersContent = mapAnswersToContent(mockSession.submittedData);

      const fieldGroups = generateFieldGroups(mockAnswersContent);

      const result = generateSummaryList(
        mockAnswersContent,
        mockSession.submittedData[POLICY_TYPE],
      );

      const expected = {
        EXPORT: {
          GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_EXPORT,
          ROWS: generateSummaryListRows(fieldGroups.EXPORT_DETAILS, mockSession.submittedData[POLICY_TYPE]),
        },
        POLICY: {
          GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_POLICY,
          ROWS: generateSummaryListRows(fieldGroups.POLICY_DETAILS, mockSession.submittedData[POLICY_TYPE]),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
