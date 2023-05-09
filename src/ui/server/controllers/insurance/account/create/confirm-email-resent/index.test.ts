import { TEMPLATE, PAGE_CONTENT_STRINGS, get } from '.';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../../types';
import api from '../../../../../api';
import { mockReq, mockRes, mockAccount } from '../../../../../test-mocks';

describe('controllers/insurance/account/create/confirm-email-resent', () => {
  let req: Request;
  let res: Response;

  const mockGetByEmailResponse = {
    success: true,
    emailRecipient: mockAccount.email,
  };

  let sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockGetByEmailResponse));

  beforeEach(() => {
    req = mockReq();
    req.query.id = mockAccount.id;

    res = mockRes();

    api.keystone.account.sendEmailConfirmEmailAddress = sendEmailConfirmEmailAddressSpy;
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      const expected = {
        ...PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL,
        ...PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT,
      };

      expect(PAGE_CONTENT_STRINGS).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should call api.keystone.account.sendEmailConfirmEmailAddress with ID from req.query', async () => {
      await get(req, res);

      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(1);

      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledWith(req.query.id);
    });

    it('should render template', async () => {
      await get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: `${req.headers.referer}?id=${req.query.id}`,
        }),
        userName: getUserNameFromSession(req.session.user),
        accountEmail: mockGetByEmailResponse.emailRecipient,
        accountId: req.query.id,
      });
    });

    describe('when req.query.id is NOT provided', () => {
      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        req.query = {};
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when req.query.id is empty', () => {
      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        req.query = { id: '' };
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when api.keystone.account.sendEmailConfirmEmailAddress does not return success=true', () => {
      beforeEach(() => {
        sendEmailConfirmEmailAddressSpy = jest.fn(() =>
          Promise.resolve({
            success: false,
            emailRecipient: mockAccount.email,
          }),
        );

        api.keystone.account.sendEmailConfirmEmailAddress = sendEmailConfirmEmailAddressSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('when there is an error', () => {
        beforeEach(() => {
          sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.reject());
          api.keystone.account.sendEmailConfirmEmailAddress = sendEmailConfirmEmailAddressSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
