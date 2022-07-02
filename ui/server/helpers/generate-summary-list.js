const {
  PAGES,
  FIELDS,
  LINKS,
} = require('../content-strings');
const {
  FIELD_GROUPS,
  FIELD_IDS,
  ROUTES,
} = require('../constants');

const {
  TRIED_PRIVATE_COVER_YES,
  TRIED_PRIVATE_COVER_NO,
  UK_CONTENT_PERCENTAGE,
  SINGLE_POLICY_TYPE,
  MULTI_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
  CREDIT_PERIOD,
} = FIELD_IDS;

const {
  EXPORT_DETAILS,
  POLICY_DETAILS,
} = FIELD_GROUPS;

/*
 * generateFieldGroups
 * Create all field groups for govukSummaryList
 * Add additional fields depending on the submitted answers and design ordering requirements:
 * - Tried private cover (must have the correct yes/no input ID)
 * - UK goods/services
 * - Policy type depending on the Policy type (single/multi)
 * - Policy length depending on the Policy type (single/multi)
 * - Policy type & length (must have the correct single/multi input ID).
 * - Credit periood
 */
const generateFieldGroups = (submittedData) => {
  const fieldGroups = { ...FIELD_GROUPS };

  fieldGroups.EXPORT_DETAILS = EXPORT_DETAILS.map((field) => ({
    ...field,
    value: submittedData[field.ID],
  }));

  fieldGroups.POLICY_DETAILS = POLICY_DETAILS.map((field) => ({
    ...field,
    value: submittedData[field.ID],
  }));

  if (submittedData[TRIED_PRIVATE_COVER_YES]) {
    fieldGroups.EXPORT_DETAILS = [
      ...fieldGroups.EXPORT_DETAILS,
      {
        ID: TRIED_PRIVATE_COVER_YES,
        ...FIELDS[TRIED_PRIVATE_COVER_YES],
        CHANGE_ROUTE: ROUTES.TRIED_TO_OBTAIN_COVER_CHANGE,
        value: {
          text: submittedData[TRIED_PRIVATE_COVER_YES].text,
        },
      },
    ];
  }

  if (submittedData[TRIED_PRIVATE_COVER_NO]) {
    fieldGroups.EXPORT_DETAILS = [
      ...fieldGroups.EXPORT_DETAILS,
      {
        ID: TRIED_PRIVATE_COVER_NO,
        ...FIELDS[TRIED_PRIVATE_COVER_NO],
        CHANGE_ROUTE: ROUTES.TRIED_TO_OBTAIN_COVER_CHANGE,
        value: {
          text: submittedData[TRIED_PRIVATE_COVER_NO].text,
        },
      },
    ];
  }

  fieldGroups.EXPORT_DETAILS = [
    ...fieldGroups.EXPORT_DETAILS,
    {
      ID: UK_CONTENT_PERCENTAGE,
      ...FIELDS[UK_CONTENT_PERCENTAGE],
      CHANGE_ROUTE: ROUTES.UK_CONTENT_PERCENTAGE_CHANGE,
      value: {
        text: submittedData[UK_CONTENT_PERCENTAGE].text,
      },
    },
  ];

  if (submittedData[SINGLE_POLICY_TYPE]) {
    fieldGroups.POLICY_DETAILS = [
      ...fieldGroups.POLICY_DETAILS,
      {
        ID: SINGLE_POLICY_TYPE,
        ...FIELDS[SINGLE_POLICY_TYPE],
        CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE,
        value: {
          text: submittedData[SINGLE_POLICY_TYPE].text,
        },
      },
      {
        ID: SINGLE_POLICY_LENGTH,
        ...FIELDS[SINGLE_POLICY_LENGTH],
        CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE,
        value: {
          text: submittedData[SINGLE_POLICY_LENGTH].text,
        },
      },
    ];
  }

  if (submittedData[MULTI_POLICY_TYPE]) {
    fieldGroups.POLICY_DETAILS = [
      ...fieldGroups.POLICY_DETAILS,
      {
        ID: MULTI_POLICY_TYPE,
        ...FIELDS[MULTI_POLICY_TYPE],
        CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE,
        value: {
          text: submittedData[MULTI_POLICY_TYPE].text,
        },
      },
      {
        ID: MULTI_POLICY_LENGTH,
        ...FIELDS[MULTI_POLICY_LENGTH],
        CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE,
        value: {
          text: submittedData[MULTI_POLICY_LENGTH].text,
        },
      },
    ];
  }

  fieldGroups.POLICY_DETAILS = [
    ...fieldGroups.POLICY_DETAILS,
    {
      ID: CREDIT_PERIOD,
      ...FIELDS[CREDIT_PERIOD],
      CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE,
      value: {
        text: submittedData[CREDIT_PERIOD].text,
      },
    },
  ];

  return fieldGroups;
};

/*
 * generateSummaryListRows
 * Map an array of fields with values in submitted data object
 * for govukSummaryList component
 */
const generateSummaryListRows = (fields) =>
  fields.map((field) => ({
    key: {
      text: FIELDS[field.ID].SUMMARY.TITLE,
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
          visuallyHiddenText: FIELDS[field.ID].SUMMARY.TITLE,
          attributes: {
            'data-cy': `${field.ID}-change-link`,
          },
        },
      ],
    },
  }));

/*
 * generateSummaryList
 * Create multiple summary lists
 */
const generateSummaryList = (submittedData) => {
  const fieldGroups = generateFieldGroups(submittedData);

  const summaryList = {
    EXPORT: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_EXPORT,
      ROWS: generateSummaryListRows(fieldGroups.EXPORT_DETAILS, submittedData),
    },
    POLICY: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_POLICY,
      ROWS: generateSummaryListRows(fieldGroups.POLICY_DETAILS, submittedData),
    },
  };

  return summaryList;
};

module.exports = {
  generateFieldGroups,
  generateSummaryListRows,
  generateSummaryList,
};
