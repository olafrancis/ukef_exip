import { PAGES } from '../../../../content-strings';
import { Request, Response, CompanyHouseResponse } from '../../../../../types';
import { TEMPLATES, ROUTES, FIELD_IDS } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { sanitiseValue } from '../../../../helpers/sanitise-data';
import api from '../../../../api';
import companiesHouseValidation from './validation/companies-house';
import companyHouseResponseValidation from './validation/companies-house-response';
import companyDetailsValidation from './validation/company-details';

import { companyHouseSummaryList } from '../../../../helpers/summary-lists/company-house-summary-list';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE,
    YOUR_COMPANY: { TRADING_NAME },
  },
} = FIELD_IDS.INSURANCE;

const { COMPANY_DETAILS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { COMPANY_DETAILS: companyDetailsTemplate } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES } = ROUTES.INSURANCE;

const { COMPANY_HOUSE_SEARCH, COMPANY_DETAILS: COMPANY_DETAILS_ROUTE } = EXPORTER_BUSINESS_ROUTES;

const pageVariables = (referenceNumber: number) => ({
  POST_ROUTES: {
    COMPANIES_HOUSE: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_HOUSE_SEARCH}`,
    COMPANY_DETAILS: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROUTE}`,
  },
  FIELDS: EXPORTER_BUSINESS,
});

/**
 * gets the template for company details page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders company details page
 */
const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  return res.render(companyDetailsTemplate, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(application.referenceNumber),
  });
};

/**
 * posts companies house number to company house api
 * validates input and response from companies house api and shows relevant errors if they exist
 * populates a summary list with the company information if no validation errors
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} companyDetails template with validation errors or summary list with company details populated
 */
const postCompaniesHouseSearch = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const { body } = req;

    const { companiesHouseNumber } = body;
    const submittedValues = {
      [COMPANY_HOUSE.INPUT]: companiesHouseNumber,
    };

    // checks if input is correctly formatted before searching
    const validationErrors = companiesHouseValidation(body);

    if (validationErrors) {
      return res.render(companyDetailsTemplate, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(application.referenceNumber),
        validationErrors,
        submittedValues,
      });
    }

    let company = {} as CompanyHouseResponse;

    // if number provided, then sends to companies house API as keystone query
    if (companiesHouseNumber) {
      try {
        company = await api.keystone.getCompaniesHouseInformation(companiesHouseNumber);
      } catch (error) {
        console.error('Error posting to companies house API', { error });
        return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
      }
    }

    // checks that success flag is not false and apiError flag is not set
    const responseValidationErrors = companyHouseResponseValidation(company);

    if (responseValidationErrors) {
      return res.render(companyDetailsTemplate, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(application.referenceNumber),
        validationErrors: responseValidationErrors,
        submittedValues,
      });
    }

    // populates summary list with company information
    const summaryList = companyHouseSummaryList(company);

    return res.render(companyDetailsTemplate, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(application.referenceNumber),
      SUMMARY_LIST: summaryList,
      submittedValues,
    });
  } catch (error) {
    console.error('Error posting companies house search', { error });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

/**
 * posts company details
 * validates tradingName fields
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Company details page with or without errors
 */
const post = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const { body } = req;

    const submittedValues = {
      [COMPANY_HOUSE.INPUT]: body[COMPANY_HOUSE.INPUT],
      // if trading name is string true, then convert to boolean true
      [TRADING_NAME]: sanitiseValue(body[TRADING_NAME]),
    };

    const validationErrors = companyDetailsValidation(body);

    if (validationErrors) {
      return res.render(companyDetailsTemplate, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(application.referenceNumber),
        validationErrors,
        submittedValues,
      });
    }

    // TODO: Remove once page complete.  For testing purposes
    return res.render(companyDetailsTemplate, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(application.referenceNumber),
      validationErrors,
      submittedValues,
    });
  } catch (error) {
    console.error('Error posting company details', { error });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, postCompaniesHouseSearch, post };
