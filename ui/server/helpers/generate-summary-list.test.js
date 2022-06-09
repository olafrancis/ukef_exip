const {
  generateSummaryListRows,
  generateSummaryList,
} = require('./generate-summary-list');
const CONTENT_STRINGS = require('../content-strings');
const { FIELD_GROUPS } = require('../constants');

describe('sever/helpers/generate-summary-list', () => {
  const mockFields = [
    {
      ID: 'a',
      TITLE: 'test',
      CHANGE_ROUTE: '/a/change',
    },
    {
      ID: 'b',
      TITLE: 'test',
      CHANGE_ROUTE: '/b/change',
    },
  ];

  const mockSubmittedData = {
    a: 'answer a',
    b: 'answer b',
  };

  describe('generateSummaryListRows', () => {
    it('returns an array of objects mapped to submitted data', () => {
      const result = generateSummaryListRows(
        mockFields,
        mockSubmittedData,
      );

      const expectedObj = (field) => ({
        key: {
          text: field.TITLE,
          classes: `${field.ID}-key`,
        },
        value: {
          text: mockSubmittedData[field.ID],
          classes: `${field.ID}-value`,
        },
        actions: {
          items: [
            {
              href: field.CHANGE_ROUTE,
              text: CONTENT_STRINGS.LINKS.CHANGE,
              visuallyHiddenText: field.TITLE,
              attributes: {
                'data-cy': `${field.ID}-change-link`,
              },
            },
          ],
        },
      });

      const expected = [
        expectedObj(mockFields[0]),
        expectedObj(mockFields[1]),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('generateSummaryList', () => {
    it('should return an object with multiple summary lists', () => {
      const result = generateSummaryList(mockSubmittedData);

      const expected = {
        COMPANY: {
          GROUP_TITLE: CONTENT_STRINGS.PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_COMPANY,
          ROWS: generateSummaryListRows(FIELD_GROUPS.COMPANY_DETAILS.FIELDS, mockSubmittedData),
        },
        EXPORT: {
          GROUP_TITLE: CONTENT_STRINGS.PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_EXPORT,
          ROWS: generateSummaryListRows(FIELD_GROUPS.EXPORT_DETAILS.FIELDS, mockSubmittedData),
        },
        DEAL: {
          GROUP_TITLE: CONTENT_STRINGS.PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_DEAL,
          ROWS: generateSummaryListRows(FIELD_GROUPS.DEAL_DETAILS.FIELDS, mockSubmittedData),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
