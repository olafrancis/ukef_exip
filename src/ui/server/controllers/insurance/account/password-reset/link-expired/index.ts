import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.PASSWORD_RESET.LINK_EXPIRED;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.LINK_EXPIRED;

const {
  ACCOUNT: {
    PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT, LINK_SENT },
  },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

/**
 * get
 * Render the "Password reset - link expired" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Password reset - link expired" page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
  });

/**
 * post
 * Get an account by ID and call the API to send a password reset link email
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} "Password reset - link sent" page
 */
export const post = async (req: Request, res: Response) => {
  try {
    console.info('Posting account password reset - link expired form');

    const urlOrigin = req.headers.origin;

    const accountId = req.query.id;

    if (!accountId) {
      return res.redirect(PASSWORD_RESET_ROOT);
    }

    const account = await api.keystone.account.get(accountId);

    const response = await api.keystone.account.sendEmailPasswordResetLink(urlOrigin, account.email);

    if (response.success) {
      // store the email address in local session, for consumption in the next part of the flow.
      req.session.emailAddressForPasswordReset = account.email;

      return res.redirect(LINK_SENT);
    }

    return res.redirect(PROBLEM_WITH_SERVICE);
  } catch (err) {
    console.error('Error posting account password reset - link expired form', { err });
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
