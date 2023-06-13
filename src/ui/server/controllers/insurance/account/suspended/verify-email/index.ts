import { ROUTES } from '../../../../../constants';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

const {
  INSURANCE: {
    ACCOUNT: {
      SUSPENDED: { ROOT: SUSPENDED_ROOT, VERIFY_EMAIL_LINK_EXPIRED },
      REACTIVATED_ROOT,
    },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

/**
 * get
 * Verify the token is valid and if so, redirect to the Account reactivated page.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Account reactivated page or link expired page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.redirect(SUSPENDED_ROOT);
    }

    const response = await api.keystone.account.verifyAccountReactivationToken(token);

    if (!response.success || response.expired) {
      return res.redirect(VERIFY_EMAIL_LINK_EXPIRED);
    }

    return res.redirect(REACTIVATED_ROOT);
  } catch (err) {
    console.error('Error verifying account password reset token', { err });
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};