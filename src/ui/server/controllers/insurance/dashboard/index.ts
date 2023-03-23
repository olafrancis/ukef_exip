import { ROUTES, TEMPLATES } from '../../../constants';
import { PAGES } from '../../../content-strings';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import api from '../../../api';
import mapApplications from '../../../helpers/mappings/map-applications';
import { Request, Response } from '../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.DASHBOARD;

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS, ACCOUNT },
  PROBLEM_WITH_SERVICE,
} = ROUTES;

/**
 * get
 * Render the Dashboard page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Dashboard page
 */
export const get = async (req: Request, res: Response) => {
  if (!req.session.user?.id) {
    return res.redirect(ACCOUNT.SIGN_IN.ROOT);
  }

  try {
    const applications = await api.keystone.applications.getAll(req.session.user.id);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DASHBOARD,
        BACK_LINK: req.headers.referer,
      }),
      applications: mapApplications(applications),
      ROUTES: {
        INSURANCE_ROOT,
        ALL_SECTIONS,
      },
    });
  } catch (err) {
    console.error("Error getting applications and rendering 'dashboard' page ", { err });

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
