import { FIELDS, PAGES } from '../../content-strings';
import { FIELD_IDS, ROUTES } from '../../constants';
import fieldGroupItem from './generate-field-group-item';
import generateSummaryListRows from './generate-summary-list-rows';
import { AnswersContent, AnswersFieldGroups } from '../../../types';

const {
  BUYER_COUNTRY,
  CONTRACT_VALUE,
  CREDIT_PERIOD,
  MAX_AMOUNT_OWED,
  MULTI_POLICY_LENGTH,
  MULTI_POLICY_TYPE,
  PERCENTAGE_OF_COVER,
  SINGLE_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
} = FIELD_IDS;

/**
 * generateFieldGroups
 * Create all field groups for govukSummaryList
 * The following fields depend on the submitted answers and design ordering requirements:
 * - Policy type depending on the Policy type (must have single/multi input ID)
 * - Policy length depending on the Policy type (must have single/multi input ID)
 * - Contract value or Max contract value depending on the Policy type
 * - Credit period if Policy type is multi
 * @param {Object} All submitted data
 * @returns {Object} All quote values in an object structure for GOVUK summary list structure
 */
const generateFieldGroups = (answers: AnswersContent) => {
  const fieldGroups = {
    EXPORT_DETAILS: [],
    POLICY_DETAILS: [],
  } as AnswersFieldGroups;

  fieldGroups.EXPORT_DETAILS = [
    fieldGroupItem({
      field: { id: BUYER_COUNTRY, ...FIELDS[BUYER_COUNTRY] },
      data: answers,
      renderChangeLink: true,
      href: `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`,
    }),
    fieldGroupItem({
      field: { id: VALID_EXPORTER_LOCATION, ...FIELDS[VALID_EXPORTER_LOCATION] },
      data: answers,
      renderChangeLink: true,
      href: `${ROUTES.QUOTE.EXPORTER_LOCATION_CHANGE}#heading`,
    }),
    fieldGroupItem({
      field: { id: HAS_MINIMUM_UK_GOODS_OR_SERVICES, ...FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES] },
      data: answers,
      renderChangeLink: true,
      href: `${ROUTES.QUOTE.UK_GOODS_OR_SERVICES_CHANGE}#heading`,
    }),
  ];

  if (answers[SINGLE_POLICY_TYPE]) {
    fieldGroups.POLICY_DETAILS = [
      fieldGroupItem({
        field: { id: SINGLE_POLICY_TYPE, ...FIELDS[SINGLE_POLICY_TYPE] },
        data: answers,
        renderChangeLink: true,
        href: `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`,
      }),
      fieldGroupItem({
        field: { id: SINGLE_POLICY_LENGTH, ...FIELDS[SINGLE_POLICY_LENGTH] },
        data: answers,
        renderChangeLink: true,
        href: `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`,
      }),
      fieldGroupItem({
        field: { id: CONTRACT_VALUE, ...FIELDS[CONTRACT_VALUE] },
        data: answers,
        renderChangeLink: true,
        href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`,
      }),
      fieldGroupItem({
        field: { id: PERCENTAGE_OF_COVER, ...FIELDS[PERCENTAGE_OF_COVER] },
        data: answers,
        renderChangeLink: true,
        href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
      }),
    ];
  }

  if (answers[MULTI_POLICY_TYPE]) {
    fieldGroups.POLICY_DETAILS = [
      fieldGroupItem({
        field: { id: MULTI_POLICY_TYPE, ...FIELDS[MULTI_POLICY_TYPE] },
        data: answers,
        renderChangeLink: true,
        href: `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`,
      }),
      fieldGroupItem({
        field: { id: MULTI_POLICY_LENGTH, ...FIELDS[MULTI_POLICY_LENGTH] },
        data: answers,
      }),
      fieldGroupItem({
        field: { id: MAX_AMOUNT_OWED, ...FIELDS[MAX_AMOUNT_OWED] },
        data: answers,
        renderChangeLink: true,
        href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`,
      }),
      fieldGroupItem({
        field: { id: PERCENTAGE_OF_COVER, ...FIELDS[PERCENTAGE_OF_COVER] },
        data: answers,
        renderChangeLink: true,
        href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
      }),
      fieldGroupItem({
        field: { id: CREDIT_PERIOD, ...FIELDS[CREDIT_PERIOD] },
        data: answers,
        renderChangeLink: true,
        href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CREDIT_PERIOD}-label`,
      }),
    ];
  }

  return fieldGroups;
};

/**
 * answersSummaryList
 * Create multiple groups with govukSummaryList data structure
 * @param {Object} All answers/submitted data in a simple object.text structure
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const answersSummaryList = (answersContent: AnswersContent) => {
  const fieldGroups = generateFieldGroups(answersContent);

  const summaryList = {
    EXPORT: {
      GROUP_TITLE: PAGES.QUOTE.CHECK_YOUR_ANSWERS.GROUP_HEADING_EXPORT,
      ROWS: generateSummaryListRows(fieldGroups.EXPORT_DETAILS),
    },
    POLICY: {
      GROUP_TITLE: PAGES.QUOTE.CHECK_YOUR_ANSWERS.GROUP_HEADING_POLICY,
      ROWS: generateSummaryListRows(fieldGroups.POLICY_DETAILS),
    },
  };

  return summaryList;
};

export { generateFieldGroups, answersSummaryList };
