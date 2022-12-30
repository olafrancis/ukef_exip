import { Application } from '../../../../types';
import { FIELD_IDS } from '../../../constants';
import getDateFieldsFromTimestamp from '../../date/get-date-fields-from-timestamp';

const {
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
  },
} = FIELD_IDS.INSURANCE;

/**
 * mapApplicationToFormFields
 * Generate an object with application data mappings for UI form fields.
 * @param {Object} Application
 * @returns {Object} Mapped application for UI form fields.
 */
const mapApplicationToFormFields = (application: Application): object => {
  if (application && Object.keys(application)) {
    const mapped = application;

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

    return mapped;
  }

  return {};
};

export default mapApplicationToFormFields;
