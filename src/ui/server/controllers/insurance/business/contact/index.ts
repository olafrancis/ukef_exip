import { PAGES } from '../../../../content-strings';
import { TEMPLATES, ROUTES } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance/exporter-business';
import ACCOUNT_FIELD_IDS from '../../../../constants/field-ids/insurance/account';
import { FIELDS, ACCOUNT_FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../../types';

const { COMPANY_NAME, POSITION } = FIELD_IDS.CONTACT;
const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const { CONTACT } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { CONTACT: CONTACT_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

export const TEMPLATE = CONTACT_TEMPLATE;

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES,
  // CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
} = ROUTES.INSURANCE;

const { CONTACT_ROOT_SAVE_AND_BACK, NATURE_OF_BUSINESS_ROOT } = EXPORTER_BUSINESS_ROUTES;

const { CONTACT: CONTACT_FIELDS } = FIELDS;

const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    COMPANY_NAME: {
      ID: COMPANY_NAME,
      ...CONTACT_FIELDS[COMPANY_NAME],
    },
    FIRST_NAME: {
      ID: FIRST_NAME,
      ...ACCOUNT_FIELDS[FIRST_NAME],
    },
    LAST_NAME: {
      ID: LAST_NAME,
      ...ACCOUNT_FIELDS[LAST_NAME],
    },
    EMAIL_ADDRESS: {
      ID: EMAIL,
      ...ACCOUNT_FIELDS[EMAIL],
    },
    POSITION: {
      ID: POSITION,
      ...CONTACT_FIELDS[POSITION],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${CONTACT_ROOT_SAVE_AND_BACK}`,
});

/**
 * gets the template for contact page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders contact page with/without previously submitted details
 */
const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: CONTACT,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      ...pageVariables(application.referenceNumber),
    });
  } catch (err) {
    console.error('Error getting contact', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

/**
 * posts contact page
 * runs validation and either renders template with errors or redirects to next page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Nature of business page
 */
const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = req.params;

    const { body } = req;

    // run validation on inputs
    const validationErrors = generateValidationErrors(body);

    // if any errors then render template with errors
    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: CONTACT,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(application),
        ...pageVariables(application.referenceNumber),
        validationErrors,
        submittedValues: body,
      });
    }

    // // if no errors, then runs save api call to db
    // const saveResponse = await mapAndSave.turnover(body, application);

    // if (!saveResponse) {
    //   return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    // }

    // if (isCheckAndChangeRoute(req.originalUrl)) {
    //   return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    // }

    // if (isChangeRoute(req.originalUrl)) {
    //   return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    // }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`);
  } catch (err) {
    console.error('Error updating application - your business - contact', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, post };