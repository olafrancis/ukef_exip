import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { CHECK_YOUR_ANSWERS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/check-your-answers';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { policyAndExportSummaryList } from '../../../../helpers/summary-lists/policy-and-export';
import { isPopulatedArray } from '../../../../helpers/array';
import api from '../../../../api';
import requiredFields from '../../../../helpers/required-fields/policy-and-exports';
import sectionStatus from '../../../../helpers/section-status';
import save from '../save-data';
import { Request, Response } from '../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.CHECK_YOUR_ANSWERS;

const FIELD_ID = FIELD_IDS.CHECK_YOUR_ANSWERS.POLICY_AND_EXPORT;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    CHECK_YOUR_ANSWERS: { YOUR_BUSINESS, TYPE_OF_POLICY_SAVE_AND_BACK },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS[FIELD_ID],
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_SAVE_AND_BACK}`,
});

/**
 * get
 * Render the check your answers policy and exports page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} check your answers policy and exports page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber, policyAndExport } = application;

    const countries = await api.keystone.countries.getAll();
    const currencies = await api.external.getCurrencies();

    if (!isPopulatedArray(countries) || !isPopulatedArray(currencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const checkAndChange = true;

    const summaryList = policyAndExportSummaryList(application.policyAndExport, referenceNumber, countries, currencies, checkAndChange);

    const fields = requiredFields(policyAndExport.policyType);

    const status = sectionStatus(fields, application);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.POLICY_AND_EXPORTS,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      status,
      SUMMARY_LIST: summaryList,
      ...pageVariables(referenceNumber),
    });
  } catch (err) {
    console.error('Error getting check your answers - policy and exports %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Save data and redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;

  try {
    // save the application
    const saveResponse = await save.sectionReview(application, req.body);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUSINESS}`);
  } catch (err) {
    console.error('Error updating check your answers - policy and exports %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
