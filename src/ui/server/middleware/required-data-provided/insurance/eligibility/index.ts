import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { Request, RequiredDataStateInsuranceEligibility, Response } from '../../../../../types';
import { getRoutesAsArray, routeIsKnown, hasRequiredData } from '../../helpers';

const { APPLY_OFFLINE, SPEAK_TO_UKEF_EFM, ELIGIBILITY, ACCOUNT } = INSURANCE_ROUTES;

const {
  ACCOUNT_TO_APPLY_ONLINE,
  CANNOT_APPLY,
  CHECK_IF_ELIGIBLE,
  NEED_TO_START_AGAIN,
  BUYER_COUNTRY,
  EXPORTER_LOCATION,
  UK_GOODS_OR_SERVICES,
  TOTAL_VALUE_INSURED,
  INSURED_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  NO_COMPANIES_HOUSE_NUMBER,
  ENTER_COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_UNAVAILABLE,
  COMPANY_NOT_ACTIVE,
  COMPANY_DETAILS,
  ELIGIBLE_TO_APPLY_ONLINE,
} = ELIGIBILITY;

const {
  ELIGIBILITY: {
    VALID_EXPORTER_LOCATION,
    HAS_COMPANIES_HOUSE_NUMBER,
    BUYER_COUNTRY: BUYER_COUNTRY_FIELD_ID,
    TOTAL_CONTRACT_VALUE,
    WANT_COVER_OVER_MAX_PERIOD,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  },
  COMPANY,
} = INSURANCE_FIELD_IDS;

export const generateRequiredData = (): RequiredDataStateInsuranceEligibility => {
  const requiredData = {} as RequiredDataStateInsuranceEligibility;

  requiredData[EXPORTER_LOCATION] = [];

  requiredData[COMPANIES_HOUSE_NUMBER] = [VALID_EXPORTER_LOCATION];

  requiredData[ENTER_COMPANIES_HOUSE_NUMBER] = [...requiredData[COMPANIES_HOUSE_NUMBER], HAS_COMPANIES_HOUSE_NUMBER];

  /**
   * Company details route requires:
   * - All data provided in previous forms, including companies house data.
   * It does not seem necessary to list every single companies house field.
   * Instead, we can simply define that a company object is required.
   * This object is only generated after successfully retrieving data from companies house.
   */
  requiredData[COMPANY_DETAILS] = [...requiredData[ENTER_COMPANIES_HOUSE_NUMBER], COMPANY];

  requiredData[BUYER_COUNTRY] = [...requiredData[COMPANY_DETAILS]];

  requiredData[TOTAL_VALUE_INSURED] = [...requiredData[BUYER_COUNTRY], BUYER_COUNTRY_FIELD_ID];

  requiredData[INSURED_PERIOD] = [...requiredData[TOTAL_VALUE_INSURED], TOTAL_CONTRACT_VALUE];

  requiredData[UK_GOODS_OR_SERVICES] = [...requiredData[INSURED_PERIOD], WANT_COVER_OVER_MAX_PERIOD];

  requiredData[ELIGIBLE_TO_APPLY_ONLINE] = [...requiredData[BUYER_COUNTRY], HAS_MINIMUM_UK_GOODS_OR_SERVICES];

  return requiredData;
};

/**
 * requiredInsuranceEligibilityDataProvided
 * Prevent users from accessing a page if all previous forms in the user flow have not been submitted.
 * Without this, a user could manually navigate to e.g, page/form no.4 - bypassing previous forms or, manually go directly to the final "you are eligible" page.
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {String} next Callback function name
 * @returns {Function} next() if all required data is provided, otherwise redirect to an exit page.
 */
export const requiredInsuranceEligibilityDataProvided = (req: Request, res: Response, next: () => void) => {
  const { originalUrl: url, method } = req;

  // get all defined routes as an array
  const routesArray = getRoutesAsArray(INSURANCE_ROUTES.ELIGIBILITY);

  // array of routes that do not require any data checks.
  const irrelevantRoutes = [
    CANNOT_APPLY,
    APPLY_OFFLINE,
    SPEAK_TO_UKEF_EFM,
    CHECK_IF_ELIGIBLE,
    NO_COMPANIES_HOUSE_NUMBER,
    COMPANIES_HOUSE_UNAVAILABLE,
    COMPANY_NOT_ACTIVE,
    NEED_TO_START_AGAIN,
    ACCOUNT_TO_APPLY_ONLINE,
    ACCOUNT.CREATE.YOUR_DETAILS,
    ACCOUNT.SIGN_IN.ROOT,
  ];

  const isIrrelevantRoute = (route: string) => irrelevantRoutes.includes(route);

  // do not run any data checks if the requested route is one of the following:
  // is a route that does not require any data checks
  // is 404 page
  // or the request is not a GET request.
  if (isIrrelevantRoute(url) || !routeIsKnown(routesArray, url) || method !== 'GET') {
    return next();
  }

  const requiredData = generateRequiredData();

  if (req.session?.submittedData) {
    const { submittedData } = req.session;

    if (!hasRequiredData(url, requiredData, submittedData.insuranceEligibility)) {
      return res.redirect(NEED_TO_START_AGAIN);
    }
  } else if (!hasRequiredData(url, requiredData, {})) {
    return res.redirect(NEED_TO_START_AGAIN);
  }

  return next();
};
