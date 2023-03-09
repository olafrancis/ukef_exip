import { Request, Response } from '../../../../../../types';
import { TEMPLATES, ROUTES } from '../../../../../constants';
import { PAGES } from '../../../../../content-strings';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';

const { COMPANIES_HOUSE_UNAVAILABLE } = PAGES.INSURANCE.EXPORTER_BUSINESS;

const { COMPANIES_HOUSE_UNAVAILABLE: COMPANIES_HOUSE_UNAVAILABLE_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES } = ROUTES.INSURANCE;

const { COMPANY_DETAILS: COMPANY_DETAILS_ROUTE, NATURE_OF_BUSINESS_ROOT } = EXPORTER_BUSINESS_ROUTES;

export const TEMPLATE = COMPANIES_HOUSE_UNAVAILABLE_TEMPLATE;

/**
 * gets the template for companies house unavailable page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders companies house unavailable page
 */
const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: COMPANIES_HOUSE_UNAVAILABLE,
        BACK_LINK: req.headers.referer,
      }),
      COMPANY_DETAILS: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROUTE}`,
      NATURE_OF_BUSINESS: `${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`,
    });
  } catch (err) {
    console.error('Error getting companies house unavailable page', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { get };