import { get } from '.';
import { ROUTES } from '../../../../../constants';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes } from '../../../../../test-mocks';

const {
  INSURANCE: {
    ACCOUNT: { CREATE, SIGN_IN },
  },
  PROBLEM_WITH_SERVICE,
} = ROUTES;

describe('controllers/insurance/account/create/verify-email', () => {
  let req: Request;
  let res: Response;

  let verifyEmailAddressSpy;
  const mockToken = 'mockToken';

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    describe('when req.query.token exists', () => {
      describe('when api.keystone.account.verifyEmailAddress returns success = true', () => {
        beforeEach(() => {
          req.query.token = mockToken;
          verifyEmailAddressSpy = jest.fn(() => Promise.resolve({ success: true }));

          api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;
        });

        it(`should redirect to ${SIGN_IN.ROOT}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(SIGN_IN.ROOT);
        });
      });

      describe('when api.keystone.account.verifyEmailAddress does NOT return success = true', () => {
        beforeEach(() => {
          req.query.token = mockToken;
          verifyEmailAddressSpy = jest.fn(() => Promise.resolve({}));

          api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;
        });

        it(`should redirect to ${CREATE.VERIFY_EMAIL_LINK_EXPIRED}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(CREATE.VERIFY_EMAIL_LINK_EXPIRED);
        });
      });
    });

    describe('when req.query.token does NOT exist', () => {
      beforeEach(() => {
        req.query = {};
        verifyEmailAddressSpy = jest.fn(() => Promise.resolve({}));

        api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;
      });

      it(`should redirect to ${CREATE.VERIFY_EMAIL_LINK_EXPIRED}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CREATE.VERIFY_EMAIL_LINK_EXPIRED);
      });
    });

    describe('api error handling', () => {
      describe('when there is an error', () => {
        beforeEach(() => {
          req.query.token = mockToken;
          verifyEmailAddressSpy = jest.fn(() => Promise.reject());

          api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});