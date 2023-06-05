import { Application } from '../../../../types';
import { FIELD_IDS } from '../../../constants';
import { objectHasKeysAndValues } from '../../object';
import mapNameFields from '../map-name-fields';
import formatDate from '../../date/format-date';
import getDateFieldsFromTimestamp from '../../date/get-date-fields-from-timestamp';
import mapFinancialYearEndDate from '../map-financial-year-end-date';
import transformNumberToString from '../../transform-number-to-string';

const {
  SUBMISSION_DEADLINE,
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
  },
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING, EMPLOYEES_INTERNATIONAL, EMPLOYEES_UK },
    TURNOVER: { FINANCIAL_YEAR_END_DATE, ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  },
} = FIELD_IDS.INSURANCE;

/**
 * mapApplicationToFormFields
 * Generate an object with application data mappings for UI form fields.
 * @param {Object} Application
 * @returns {Object} Mapped application for UI form fields.
 */
const mapApplicationToFormFields = (application?: Application): object => {
  if (application && objectHasKeysAndValues(application)) {
    const mapped = mapNameFields(application);

    if (mapped[SUBMISSION_DEADLINE]) {
      mapped[SUBMISSION_DEADLINE] = formatDate(application[SUBMISSION_DEADLINE]);
    }

    if (application.policyAndExport && application.policyAndExport[REQUESTED_START_DATE]) {
      const timestamp = application.policyAndExport[REQUESTED_START_DATE];

      mapped.policyAndExport = {
        ...mapped.policyAndExport,
        ...getDateFieldsFromTimestamp(timestamp, REQUESTED_START_DATE),
      };
    }

    if (application.policyAndExport && application.policyAndExport[CONTRACT_COMPLETION_DATE]) {
      const timestamp = application.policyAndExport[CONTRACT_COMPLETION_DATE];

      mapped.policyAndExport = {
        ...mapped.policyAndExport,
        ...getDateFieldsFromTimestamp(timestamp, CONTRACT_COMPLETION_DATE),
      };
    }

    if (application.company && application.company[FINANCIAL_YEAR_END_DATE]) {
      mapped.company = {
        ...mapped.company,
        [FINANCIAL_YEAR_END_DATE]: mapFinancialYearEndDate(application.company[FINANCIAL_YEAR_END_DATE]),
      };
    }

    if (application.business) {
      mapped.business = {
        ...mapped.business,
        [YEARS_EXPORTING]: transformNumberToString(application.business[YEARS_EXPORTING]),
        [EMPLOYEES_UK]: transformNumberToString(application.business[EMPLOYEES_UK]),
        [EMPLOYEES_INTERNATIONAL]: transformNumberToString(application.business[EMPLOYEES_INTERNATIONAL]),
        [PERCENTAGE_TURNOVER]: transformNumberToString(application.business[PERCENTAGE_TURNOVER]),
        [ESTIMATED_ANNUAL_TURNOVER]: transformNumberToString(application.business[ESTIMATED_ANNUAL_TURNOVER]),
      };
    }

    return mapped;
  }

  return {};
};

export default mapApplicationToFormFields;
