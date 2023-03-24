import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { policyAndExportSummaryList } from '../../../../helpers/summary-lists/policy-and-export';
import isPopulatedArray from '../../../../helpers/is-populated-array';
import api from '../../../../api';

export const TEMPLATE = TEMPLATES.INSURANCE.CHECK_YOUR_ANSWERS;

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE: {
    INSURANCE_ROOT,
    CHECK_YOUR_ANSWERS: { YOUR_BUSINESS, TYPE_OF_POLICY_SAVE_AND_BACK },
  },
} = ROUTES;

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

    const { referenceNumber } = application;

    const countries = await api.keystone.countries.getAll();
    const currencies = await api.external.getCurrencies();

    if (!isPopulatedArray(countries) || !isPopulatedArray(currencies)) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }
    const checkAndChange = true;

    const summaryList = policyAndExportSummaryList(application.policyAndExport, referenceNumber, countries, currencies, checkAndChange);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.POLICY_AND_EXPORTS,
        BACK_LINK: req.headers.referer,
      }),
      SUMMARY_LIST: summaryList,
      SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_SAVE_AND_BACK}`,
    });
  } catch (err) {
    console.error('Error getting check your answers - policy and exports', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = req.params;

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUSINESS}`);
  } catch (err) {
    console.error('Error posting check your answers - policy and exports', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};