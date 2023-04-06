import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import api from '../../../../api';
import isPopulatedArray from '../../../../helpers/is-populated-array';
import { objectHasProperty } from '../../../../helpers/object';
import { mapCurrencies } from '../../../../helpers/mappings/map-currencies';
import mapTotalMonthsOfCover from '../../../../helpers/mappings/map-total-months-of-insurance';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY_AND_EXPORTS: { MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK, ABOUT_GOODS_OR_SERVICES, CHECK_YOUR_ANSWERS },
    CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  },
} = ROUTES;

const {
  POLICY_AND_EXPORTS: { CONTRACT_POLICY },
} = FIELD_IDS.INSURANCE;

const {
  REQUESTED_START_DATE,
  MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  CREDIT_PERIOD_WITH_BUYER,
  POLICY_CURRENCY_CODE,
} = CONTRACT_POLICY;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    REQUESTED_START_DATE: {
      ID: REQUESTED_START_DATE,
      ...FIELDS.CONTRACT_POLICY[REQUESTED_START_DATE],
    },
    TOTAL_MONTHS_OF_COVER: {
      ID: TOTAL_MONTHS_OF_COVER,
      ...FIELDS.CONTRACT_POLICY.MULTIPLE[TOTAL_MONTHS_OF_COVER],
    },
    TOTAL_SALES_TO_BUYER: {
      ID: TOTAL_SALES_TO_BUYER,
      ...FIELDS.CONTRACT_POLICY.MULTIPLE[TOTAL_SALES_TO_BUYER],
    },
    MAXIMUM_BUYER_WILL_OWE: {
      ID: MAXIMUM_BUYER_WILL_OWE,
      ...FIELDS.CONTRACT_POLICY.MULTIPLE[MAXIMUM_BUYER_WILL_OWE],
    },
    CREDIT_PERIOD_WITH_BUYER: {
      ID: CREDIT_PERIOD_WITH_BUYER,
      ...FIELDS.CONTRACT_POLICY[CREDIT_PERIOD_WITH_BUYER],
    },
    POLICY_CURRENCY_CODE: {
      ID: POLICY_CURRENCY_CODE,
      ...FIELDS.CONTRACT_POLICY[POLICY_CURRENCY_CODE],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY;

export const totalMonthsOfCoverOptions = FIELDS.CONTRACT_POLICY.MULTIPLE[TOTAL_MONTHS_OF_COVER].OPTIONS as Array<number>;

/**
 * get
 * Get the application and render the Multiple contract policy page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Multiple contract policy page
 */
export const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  try {
    const currencies = await api.external.getCurrencies();

    if (!isPopulatedArray(currencies)) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    let mappedCurrencies;

    if (objectHasProperty(application.policyAndExport, POLICY_CURRENCY_CODE)) {
      mappedCurrencies = mapCurrencies(currencies, application.policyAndExport[POLICY_CURRENCY_CODE]);
    } else {
      mappedCurrencies = mapCurrencies(currencies);
    }

    let mappedTotalMonthsOfCover;

    if (objectHasProperty(application.policyAndExport, TOTAL_MONTHS_OF_COVER)) {
      mappedTotalMonthsOfCover = mapTotalMonthsOfCover(totalMonthsOfCoverOptions, application.policyAndExport[TOTAL_MONTHS_OF_COVER]);
    } else {
      mappedTotalMonthsOfCover = mapTotalMonthsOfCover(totalMonthsOfCoverOptions);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(refNumber),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      currencies: mappedCurrencies,
      monthOptions: mappedTotalMonthsOfCover,
    });
  } catch (err) {
    console.error('Error getting currencies ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check Multiple contract policy validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    try {
      const currencies = await api.external.getCurrencies();

      if (!isPopulatedArray(currencies)) {
        return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
      }

      let mappedCurrencies;

      if (objectHasProperty(req.body, POLICY_CURRENCY_CODE)) {
        mappedCurrencies = mapCurrencies(currencies, req.body[POLICY_CURRENCY_CODE]);
      } else {
        mappedCurrencies = mapCurrencies(currencies);
      }

      let mappedTotalMonthsOfCover;

      if (objectHasProperty(req.body, TOTAL_MONTHS_OF_COVER)) {
        mappedTotalMonthsOfCover = mapTotalMonthsOfCover(totalMonthsOfCoverOptions, req.body[TOTAL_MONTHS_OF_COVER]);
      } else {
        mappedTotalMonthsOfCover = mapTotalMonthsOfCover(totalMonthsOfCoverOptions);
      }

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(application),
        submittedValues: req.body,
        currencies: mappedCurrencies,
        monthOptions: mappedTotalMonthsOfCover,
        validationErrors,
      });
    } catch (err) {
      console.error('Error getting currencies ', { err });

      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }
  }

  try {
    // save the application
    const saveResponse = await mapAndSave.policyAndExport(req.body, application);

    if (!saveResponse) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`);
  } catch (err) {
    console.error('Error updating application - policy and exports - multiple contract policy', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
