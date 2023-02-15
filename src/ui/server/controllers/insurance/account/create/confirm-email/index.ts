import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL;

/**
 * get
 * Render the Confirm email page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Confirm email page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { accountIdToConfirm: exporterId } = req.session;

    delete req.session.accountIdToConfirm;

    let exporterEmail;

    if (exporterId) {
      const exporter = await api.keystone.account.get(exporterId);

      exporterEmail = exporter.email;
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      exporterEmail,
      exporterId,
    });
  } catch (err) {
    console.error("Error getting exporter by email and rendering 'confirm email' page", { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
