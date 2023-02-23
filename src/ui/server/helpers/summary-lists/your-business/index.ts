import generateSummaryListRows from '../generate-summary-list-rows';
import generateYourCompanyFields from './your-company-fields';
import generateNatureOfYourBusinessFields from './nature-of-your-business-fields';
import { ApplicationExporterCompany, ApplicationExporterBusiness, SummaryListItemData } from '../../../../types';

/**
 * generateFields
 * Create all fields for the insurance - Your business govukSummaryList
 * @param {ApplicationExporterCompany} answersExporterCompany Application exporterCompany object
 * @param {ApplicationExporterBusiness} answersExporterBusiness Application exporterCompany object
 * @param {Number} referenceNumber Application reference number
 * @returns {Object} All your business values in an object structure for GOVUK summary list structure
 */
const generateFields = (answersExporterCompany: ApplicationExporterCompany, answersExporterBusiness: ApplicationExporterBusiness, referenceNumber: number) => {
  let fields = [] as Array<SummaryListItemData>;

  fields = [
    ...generateYourCompanyFields(answersExporterCompany, referenceNumber),
    ...generateNatureOfYourBusinessFields(answersExporterBusiness, referenceNumber),
  ];

  return fields;
};

/**
 * yourBusinessSummaryList
 * Create multiple groups with govukSummaryList data structure
 * @param {ApplicationExporterCompany} answersExporterCompany Application exporterCompany object
 * @param {ApplicationExporterBusiness} answersExporterBusiness Application exporterBusiness object
 * @param {Number} referenceNumber Application reference number
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const yourBusinessSummaryList = (
  answersExporterCompany: ApplicationExporterCompany,
  answersExporterBusiness: ApplicationExporterBusiness,
  referenceNumber: number,
) => {
  const fields = generateFields(answersExporterCompany, answersExporterBusiness, referenceNumber);

  const summaryList = generateSummaryListRows(fields);

  return summaryList;
};

export { generateFields, yourBusinessSummaryList };
