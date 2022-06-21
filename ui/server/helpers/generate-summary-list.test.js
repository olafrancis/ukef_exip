const {
  generateSummaryListRows,
  generateSummaryList,
} = require('./generate-summary-list');
const {
  FIELDS,
  LINKS,
  PAGES,
} = require('../content-strings');
const {
  FIELD_IDS,
  FIELD_GROUPS,
  ROUTES,
} = require('../constants');
const { mockAnswers } = require('../test-mocks');

describe('sever/helpers/generate-summary-list', () => {
  const mockFields = [
    {
      ID: FIELD_IDS.VALID_COMPANY_BASE,
      ...FIELDS[FIELD_IDS.VALID_COMPANY_BASE],
      CHANGE_ROUTE: ROUTES.COMPANY_BASED_CHANGE,
    },
  ];

  const mockSubmittedData = {
    [FIELD_IDS.VALID_COMPANY_BASE]: true,
  };

  describe('generateSummaryListRows', () => {
    it('returns an array of objects mapped to submitted data', () => {
      const result = generateSummaryListRows(
        FIELD_GROUPS.COMPANY_DETAILS.FIELDS,
        mockSubmittedData,
      );

      const expectedObj = (field) => ({
        key: {
          text: FIELDS[field.ID].SUMMARY.TITLE,
          classes: `${field.ID}-key`,
        },
        value: {
          text: mockAnswers[field.ID],
          classes: `${field.ID}-value`,
        },
        actions: {
          items: [
            {
              href: field.CHANGE_ROUTE,
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
      const result = generateSummaryList(mockAnswers);

      const expected = {
        COMPANY: {
          GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_COMPANY,
          ROWS: generateSummaryListRows(FIELD_GROUPS.COMPANY_DETAILS.FIELDS, mockAnswers),
        },
        EXPORT: {
          GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_EXPORT,
          ROWS: generateSummaryListRows(FIELD_GROUPS.EXPORT_DETAILS.FIELDS, mockAnswers),
        },
        DEAL: {
          GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_DEAL,
          ROWS: generateSummaryListRows(FIELD_GROUPS.DEAL_DETAILS.FIELDS, mockAnswers),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});