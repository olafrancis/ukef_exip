import api from '../../../../../api';
import companiesHouseValidation from '../validation/companies-house';
import companyHouseResponseValidation from '../validation/companies-house-response';
import { RequestBody, CompanyHouseResponse } from '../../../../../../types';
import { FIELD_IDS } from '../../../../../constants';

const {
  COMPANY_HOUSE: { INPUT },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

/**
 * helper which takes formBody containing companies house number
 * runs validation and makes api call to keystone getCompaniesHouseInformation
 * runs validation on response and returns companyResponse or validation errors or apiError
 * @param {RequestBody} formBody
 * @returns {object} validationErrors, apiError flag, companiesHouseNumber and companyResponse
 */
const companiesHouseSearch = async (formBody: RequestBody) => {
  const { [INPUT]: companiesHouseNumber } = formBody;

  // checks input is correctly formatted
  const validationErrors = companiesHouseValidation(formBody);

  if (validationErrors) {
    return {
      validationErrors,
      companiesHouseNumber,
    };
  }

  let company = {} as CompanyHouseResponse;

  // if number provided, then sends to companies house API as keystone query
  if (companiesHouseNumber) {
    try {
      company = await api.keystone.getCompaniesHouseInformation(companiesHouseNumber);
    } catch (error) {
      console.error('Error posting to companies house API', { error });
      return {
        apiError: true,
        companiesHouseNumber,
        validationErrors: {},
      };
    }
  }

  // if company exists and has a value
  if (company && Object.keys(company).length) {
    // checks that success flag is not false and apiError flag is not set
    const responseValidationErrors = companyHouseResponseValidation(company);

    if (responseValidationErrors) {
      return {
        validationErrors: responseValidationErrors,
        companiesHouseNumber,
      };
    }

    return {
      company,
      companiesHouseNumber,
      validationErrors: {},
    };
  }

  return {
    apiError: true,
    companiesHouseNumber,
    validationErrors: {},
  };
};

export default companiesHouseSearch;
