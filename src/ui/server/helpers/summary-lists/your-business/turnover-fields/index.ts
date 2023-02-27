import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapPercentage from '../../../map-percentage';
import { ApplicationExporterBusiness, SummaryListItemData } from '../../../../../types';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    EXPORTER_BUSINESS: { TURNOVER_CHANGE },
  },
} = ROUTES;

const {
  TURNOVER: { PERCENTAGE_TURNOVER, ESTIMATED_ANNUAL_TURNOVER },
} = FIELD_IDS;

/**
 * generateTurnover
 * Create all your turnover fields and values for the Insurance - Turnover govukSummaryList
 * @param {ApplicationExporterBusiness} answers exporter turnover
 * @returns {Object} All turnover fields and values in an object structure for GOVUK summary list structure
 */
const generateTurnoverFields = (answers: ApplicationExporterBusiness, referenceNumber: number) => {
  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS.TURNOVER, ESTIMATED_ANNUAL_TURNOVER),
      data: answers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${TURNOVER_CHANGE}#${ESTIMATED_ANNUAL_TURNOVER}-label`,
      renderChangeLink: true,
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.TURNOVER, PERCENTAGE_TURNOVER),
        data: answers,
        href: `${INSURANCE_ROOT}/${referenceNumber}${TURNOVER_CHANGE}#${PERCENTAGE_TURNOVER}-label`,
        renderChangeLink: true,
      },
      mapPercentage(answers[PERCENTAGE_TURNOVER]),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateTurnoverFields;