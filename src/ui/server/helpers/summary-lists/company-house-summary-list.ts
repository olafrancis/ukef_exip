import formatDate from '../date/format-date';
import { FIELD_IDS } from '../../constants';
import { DEFAULT, FIELDS, PAGES } from '../../content-strings';
import generateSummaryListRows from './generate-summary-list-rows';
import fieldGroupItem from './generate-field-group-item';
import getFieldById from '../get-field-by-id';
import { ApplicationExporterCompany, CompanyHouseResponse, SummaryListItemData } from '../../../types';
import generateMultipleFieldHtml from '../generate-multiple-field-html';

const {
  EXPORTER_BUSINESS: { COMPANY_HOUSE },
} = FIELD_IDS.INSURANCE;

const { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC } = COMPANY_HOUSE;

/**
 * generateSicCodesValue
 * @param {String} Sic codes
 * @returns {String} Sic codes as a single string or default empty string
 */
const generateSicCodesValue = (sicCodes?: Array<string>): string => {
  if (sicCodes && sicCodes.length) {
    return sicCodes.toString();
  }

  return DEFAULT.EMPTY;
};

/**
 * Create all field groups for govukSummaryList
 * The following fields depend on the response from companies house api:
 * - COMPANY_ADDRESS - if all parts of address are returned or not
 * @param {Object} Company details
 * @returns {Object} All quote values in an object structure for GOVUK summary list structure
 */
const generateFields = (companyDetails: CompanyHouseResponse | ApplicationExporterCompany) => {
  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS, COMPANY_NUMBER),
      data: companyDetails,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS, COMPANY_NAME),
      data: companyDetails,
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, COMPANY_ADDRESS),
        data: companyDetails,
      },
      generateMultipleFieldHtml(companyDetails[COMPANY_ADDRESS]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, COMPANY_INCORPORATED),
        data: companyDetails,
      },
      formatDate(companyDetails[COMPANY_INCORPORATED]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, COMPANY_SIC),
        data: companyDetails,
      },
      generateSicCodesValue(companyDetails[COMPANY_SIC]),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

/**
 * companyHouseSummaryList
 * Create a group with govukSummaryList data structure
 * @param {Object} All quote content in a simple object.text structure
 * @returns {Object} A group with multiple fields/answers in govukSummaryList data structure
 */
const companyHouseSummaryList = (companyDetails: CompanyHouseResponse | ApplicationExporterCompany) => {
  const fields = generateFields(companyDetails);

  const summaryList = {
    COMPANY_DETAILS: {
      GROUP_TITLE: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS.TABLE_NAME,
      ROWS: generateSummaryListRows(fields),
    },
  };

  return summaryList;
};

export { generateSicCodesValue, generateFields, companyHouseSummaryList };
