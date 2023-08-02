import { PAGES } from '../../../../content-strings';
import { TEMPLATES, ROUTES } from '../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { sanitiseValue } from '../../../../helpers/sanitise-data';
import companiesHouseSearch from './helpers/companies-house-search.helper';
import constructPayload from '../../../../helpers/construct-payload';
import companyDetailsValidation from './validation/company-details';
import { isPopulatedArray } from '../../../../helpers/array';
import mapAndSave from '../map-and-save/company-details';
import { populateCompaniesHouseSummaryList } from './helpers/populate-companies-house-summary-list';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { companyHouseSummaryList } from '../../../../helpers/summary-lists/company-house-summary-list';
import { Request, Response } from '../../../../../types';

const {
  COMPANY_HOUSE,
  YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER },
} = BUSINESS_FIELD_IDS;

const { COMPANY_DETAILS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { COMPANY_DETAILS: COMPANY_DETAILS_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

export const TEMPLATE = COMPANY_DETAILS_TEMPLATE;

export const FIELD_IDS = [COMPANY_HOUSE.INPUT, TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER];

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const {
  COMPANY_HOUSE_SEARCH,
  COMPANY_DETAILS: COMPANY_DETAILS_ROUTE,
  COMPANIES_HOUSE_UNAVAILABLE,
  NO_COMPANIES_HOUSE_NUMBER,
  COMPANY_DETAILS_SAVE_AND_BACK,
  CONTACT_ROOT,
  CHECK_YOUR_ANSWERS,
} = EXPORTER_BUSINESS_ROUTES;

const pageVariables = (referenceNumber: number, ORIGINAL_URL: string) => {
  let companyDetailsPostRoute = `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROUTE}`;

  // if change route, then should use change url to go back to check your answers
  if (isChangeRoute(ORIGINAL_URL) || isCheckAndChangeRoute(ORIGINAL_URL)) {
    companyDetailsPostRoute = ORIGINAL_URL;
  }

  return {
    POST_ROUTES: {
      COMPANIES_HOUSE: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_HOUSE_SEARCH}`,
      COMPANY_DETAILS: companyDetailsPostRoute,
      SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_SAVE_AND_BACK}`,
      NO_COMPANIES_HOUSE_NUMBER: `${INSURANCE_ROOT}/${referenceNumber}${NO_COMPANIES_HOUSE_NUMBER}`,
    },
    FIELDS: BUSINESS_FIELD_IDS,
  };
};

const exitReason = {
  noCompaniesHouseNumber: PAGES.INSURANCE.APPLY_OFFLINE.REASON.NO_COMPANIES_HOUSE_NUMBER,
};

/**
 * gets the template for company details page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders company details page with/without previously submitted details
 */
const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { company } = application;

    // values from application if they exist
    const submittedValues = {
      [COMPANY_HOUSE.INPUT]: company?.[COMPANY_HOUSE.COMPANY_NUMBER],
      [TRADING_NAME]: company?.[TRADING_NAME],
      [TRADING_ADDRESS]: company?.[TRADING_ADDRESS],
      [WEBSITE]: company?.[WEBSITE],
      [PHONE_NUMBER]: company?.[PHONE_NUMBER],
    };

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      ...pageVariables(application.referenceNumber, req.originalUrl),
      submittedValues,
      // summary list for company details
      SUMMARY_LIST: populateCompaniesHouseSummaryList(company),
    });
  } catch (err) {
    console.error('Error getting company details', { err });
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

const redirectToExitPage = {
  /**
   * handles redirect to apply offline page if no companies house number link is pressed
   * @param {Express.Request} Express request
   * @param {Express.Response} Express response
   * @returns {Express.Response.redirect} redirects to apply offline page
   */
  noCompaniesHouseNumber: (req: Request, res: Response) => {
    req.flash('exitReason', exitReason.noCompaniesHouseNumber);

    return res.redirect(ROUTES.INSURANCE.APPLY_OFFLINE);
  },
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
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;
    const { body } = req;

    const payload = constructPayload(body, FIELD_IDS);

    // checks if input is correctly formatted before searching
    const response = await companiesHouseSearch(payload);

    const { validationErrors, apiError, company } = response;

    if (apiError) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${COMPANIES_HOUSE_UNAVAILABLE}`);
    }

    if (isPopulatedArray(Object.keys(validationErrors))) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(application.referenceNumber, req.originalUrl),
        validationErrors,
        submittedValues: payload,
      });
    }

    if (company) {
      // populates summary list with company information
      const summaryList = companyHouseSummaryList(company);

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(application.referenceNumber, req.originalUrl),
        validationErrors,
        SUMMARY_LIST: summaryList,
        submittedValues: payload,
      });
    }

    return res.redirect(PROBLEM_WITH_SERVICE);
  } catch (err) {
    console.error('Error posting companise house search - your business - company details', { err });
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * posts company details
 * runs validation and either renders template with errors or redirects to next page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Nature of business page with or without errors
 */
const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;
    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    const { body } = req;
    // runs companiesHouse validation and api call first for companiesHouse input
    const response = await companiesHouseSearch(body);

    const { apiError, companiesHouseNumber, company } = response;

    // if error, then there is problem with api/service to redirect
    if (apiError) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${COMPANIES_HOUSE_UNAVAILABLE}`);
    }

    let { validationErrors } = response;

    const payload = constructPayload(body, FIELD_IDS);

    // populate submittedValues
    const submittedValues = {
      [COMPANY_HOUSE.INPUT]: companiesHouseNumber,
      // if trading name is string true, then convert to boolean true
      [TRADING_NAME]: sanitiseValue({ value: body[TRADING_NAME] }),
      [TRADING_ADDRESS]: sanitiseValue({ value: body[TRADING_ADDRESS] }),
      [WEBSITE]: body[WEBSITE],
      [PHONE_NUMBER]: body[PHONE_NUMBER],
    };

    // run validation on other fields on page
    validationErrors = companyDetailsValidation(body, validationErrors);

    // if any errors then render template with errors
    if (isPopulatedArray(Object.keys(validationErrors))) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(application.referenceNumber, req.originalUrl),
        validationErrors,
        submittedValues,
      });
    }

    const updateBody = {
      ...payload,
      ...company,
    };

    // if no errors, then runs save api call to db
    const saveResponse = await mapAndSave.companyDetails(updateBody, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CONTACT_ROOT}`);
  } catch (err) {
    console.error('Error updating application - your business - company details', { err });
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, postCompaniesHouseSearch, redirectToExitPage, post };
