import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import api from '../../../../api';
import { sanitiseData } from '../../../../helpers/sanitise-data';

const { POLICY_AND_EXPORTS } = FIELD_IDS.INSURANCE;

const PAGE_VARIABLES = {
  FIELD: FIELDS[POLICY_AND_EXPORTS.POLICY_TYPE],
};

/**
 * get
 * Get the application and render the Type of policy page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Type of policy page
 */
const get = async (req: Request, res: Response) => {
  const { referenceNumber } = req.params;

  try {
    const application = await api.keystone.application.get(Number(referenceNumber));

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY,
        BACK_LINK: req.headers.referer,
      }),
      ...PAGE_VARIABLES,
      application,
    });
  } catch (err) {
    console.error('Error getting application ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check Type of policy validation errors and if successful, send to the API and redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
const post = async (req: Request, res: Response) => {
  try {
    // check for form errors.
    const validationErrors = generateValidationErrors(req.body);

    if (validationErrors) {
      return res.render(TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
        validationErrors,
      });
    }

    // get the application.
    const { referenceNumber } = req.params;

    const application = await api.keystone.application.get(Number(referenceNumber));

    // check that the application exists and has policyAndExport.id.
    if (!application || !application.policyAndExport || !application.policyAndExport.id) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const policyAndExportId = application.policyAndExport.id;

    // sanitise the form data.
    const sanitisedData = sanitiseData(req.body);

    try {
      // send the form data to the API for database update.
      const saveResponse = await api.keystone.application.update.policyAndExport(policyAndExportId, sanitisedData);

      if (!saveResponse) {
        return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
      }

      return res.redirect(`${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`);
    } catch (err) {
      console.error('Error updating application', { err });

      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }
  } catch (err) {
    console.error('Error getting application', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { PAGE_VARIABLES, get, post };
